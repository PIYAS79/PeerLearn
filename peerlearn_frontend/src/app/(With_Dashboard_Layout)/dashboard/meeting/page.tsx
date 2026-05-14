'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import io from 'socket.io-client';
import { useSearchParams, useRouter } from 'next/navigation';
import { useGetRequestByCallIdQuery, useUpdateRequestStatusMutation } from '@/redux/api/requestApi';
import { get_User_Info } from '@/services/auth.services';

// Socket is created once outside the component to avoid re-connections on re-render
const socket = io('https://peerlearn-socket-server.onrender.com', {
  transports: ['websocket'],
});

export default function Meeting_Page() {
  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const remoteVideoRef = useRef<HTMLVideoElement | null>(null);
  const peerRef = useRef<RTCPeerConnection | null>(null);
  const localStreamRef = useRef<MediaStream | null>(null);

  const [updateStatus] = useUpdateRequestStatusMutation();
  const router = useRouter();
  const user_info = get_User_Info();

  const [isCallActive, setIsCallActive] = useState(false);
  const [remoteConnected, setRemoteConnected] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const searchParams = useSearchParams();
  const call_id = searchParams.get('call_id');
  const roomId = call_id as string;

  const { data: request_data } = useGetRequestByCallIdQuery(
    { call_id },
    { skip: !call_id }
  );

  // ── Timer ──────────────────────────────────────────────────────────
  useEffect(() => {
    if (isCallActive) {
      timerRef.current = setInterval(() => setCallDuration((p) => p + 1), 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
      setCallDuration(0);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isCallActive]);

  const formatDuration = (s: number) =>
    `${Math.floor(s / 60).toString().padStart(2, '0')}:${(s % 60).toString().padStart(2, '0')}`;

  // ── Handle remote peer hanging up ──────────────────────────────────
  const handleRemoteHangup = useCallback(() => {
    setRemoteConnected(false);
    if (remoteVideoRef.current) remoteVideoRef.current.srcObject = null;
    peerRef.current?.close();
    peerRef.current = null;
    socket.off('user-joined');
    socket.off('offer');
    socket.off('answer');
    socket.off('ice-candidate');
    socket.off('end-call');
  }, []);

  // ── Full cleanup ───────────────────────────────────────────────────
  const cleanupPeer = useCallback(() => {
    peerRef.current?.close();
    peerRef.current = null;
    localStreamRef.current?.getTracks().forEach((t) => t.stop());
    localStreamRef.current = null;
    if (localVideoRef.current) localVideoRef.current.srcObject = null;
    if (remoteVideoRef.current) remoteVideoRef.current.srcObject = null;
    setRemoteConnected(false);
    setIsCallActive(false);
    socket.off('user-joined');
    socket.off('offer');
    socket.off('answer');
    socket.off('ice-candidate');
    socket.off('end-call');
  }, []);

  // ── Start Call ─────────────────────────────────────────────────────
  const startCall = async () => {
    if (!roomId) return;

    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    localStreamRef.current = stream;
    if (localVideoRef.current) localVideoRef.current.srcObject = stream;

    const peer = new RTCPeerConnection({
      iceServers: [
        { urls: 'stun:stun.l.google.com:19302' },
        { urls: 'stun:stun1.l.google.com:19302' },
      ],
    });
    peerRef.current = peer;

    stream.getTracks().forEach((track) => peer.addTrack(track, stream));

    peer.ontrack = (event) => {
      setRemoteConnected(true);
      if (remoteVideoRef.current) remoteVideoRef.current.srcObject = event.streams[0];
    };

    peer.onicecandidate = (event) => {
      if (event.candidate) socket.emit('ice-candidate', { candidate: event.candidate, roomId });
    };

    peer.onconnectionstatechange = () => {
      if (['disconnected', 'failed', 'closed'].includes(peer.connectionState)) {
        handleRemoteHangup();
      }
    };

    // Remove any stale listeners before attaching fresh ones
    socket.off('user-joined');
    socket.off('offer');
    socket.off('answer');
    socket.off('ice-candidate');
    socket.off('end-call');

    // ── KEY FIX: HOST/GUEST pattern ──────────────────────────────────
    // The server emits 'user-joined' to the FIRST person (host) when
    // the second person (guest) connects. So:
    //   • HOST = the one who was already in the room → creates OFFER
    //   • GUEST = the one who joined after          → receives offer, sends ANSWER

    socket.on('user-joined', async () => {
      // I am the HOST — create and send the offer
      try {
        if (peer.signalingState === 'stable') {
          const offer = await peer.createOffer();
          await peer.setLocalDescription(offer);
          socket.emit('offer', { offer, roomId });
        }
      } catch (err) {
        console.error('Error creating offer:', err);
      }
    });

    socket.on('offer', async (offer) => {
      // I am the GUEST — I received the host's offer
      try {
        // Guard: only accept if we haven't already set a remote description
        if (peer.signalingState === 'stable') {
          await peer.setRemoteDescription(new RTCSessionDescription(offer));
          const answer = await peer.createAnswer();
          await peer.setLocalDescription(answer);
          socket.emit('answer', { answer, roomId });
        }
      } catch (err) {
        console.error('Error handling offer:', err);
      }
    });

    socket.on('answer', async (answer) => {
      // I am the HOST — received the guest's answer
      try {
        // Guard: only accept if we sent an offer and are waiting for answer
        if (peer.signalingState === 'have-local-offer') {
          await peer.setRemoteDescription(new RTCSessionDescription(answer));
        }
      } catch (err) {
        console.error('Error handling answer:', err);
      }
    });

    socket.on('ice-candidate', async (candidate) => {
      try {
        // Buffer ICE candidates until remote description is set
        if (peer.remoteDescription) {
          await peer.addIceCandidate(new RTCIceCandidate(candidate));
        }
      } catch (err) {
        console.error('Error adding ICE candidate:', err);
      }
    });

    // The other person clicked End Call → clear their video on my side
    socket.on('end-call', () => {
      handleRemoteHangup();
    });

    socket.emit('join-room', roomId);
    setIsCallActive(true);

    // Only set ONGOING if not already ongoing (handles rejoin case)
    if (request_data?.status !== 'ONGOING') {
      updateStatus({ request_id: request_data?.id, status: 'ONGOING' });
    }
  };

  // ── End Call ────────────────────────────────────────────────────────
  const endCall = () => {
    // Notify the other peer BEFORE we clean up
    socket.emit('end-call', { roomId });

    cleanupPeer();

    updateStatus({ request_id: request_data?.id, status: 'COMPLETED' });

    const isReqMaker = (user_info as any)?.email === request_data?.req_maker?.email;
    if (isReqMaker) {
      router.push(`/dashboard/evaluation?call_id=${roomId}`);
    } else {
      router.push(`/dashboard/material?call_id=${roomId}`);
    }
  };

  // ── Cleanup on unmount ──────────────────────────────────────────────
  useEffect(() => {
    return () => { cleanupPeer(); };
  }, [cleanupPeer]);

  if (!roomId) {
    return (
      <div className="meeting-page">
        <style>{styles}</style>
        <div className="no-room">
          <div className="no-room-icon">📡</div>
          <h2>No Meeting Found</h2>
          <p>No call ID was provided. Please join via a valid meeting link.</p>
          <button className="btn-primary" onClick={() => router.push('/dashboard')}>
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="meeting-page">
      <style>{styles}</style>

      <div className="meeting-header">
        <div className="header-left">
          <div className="brand-dot" />
          <span className="brand-name">PeerLearn</span>
          <span className="divider">|</span>
          <span className="room-label">Room: <code>{roomId.slice(0, 12)}…</code></span>
        </div>
        <div className="header-right">
          <div className={`status-badge ${isCallActive ? 'active' : 'idle'}`}>
            <span className="status-dot" />
            {isCallActive
              ? remoteConnected ? 'Connected' : 'Waiting for peer…'
              : 'Not Connected'}
          </div>
          {isCallActive && <div className="timer">{formatDuration(callDuration)}</div>}
        </div>
      </div>

      <div className="video-grid">
        <div className={`video-card local ${isCallActive ? 'active' : ''}`}>
          <div className="video-label"><span className="label-dot you" />You</div>
          <video ref={localVideoRef} autoPlay muted playsInline className="video-el" />
          {!isCallActive && (
            <div className="video-placeholder">
              <div className="placeholder-icon">🎥</div>
              <span>Camera off</span>
            </div>
          )}
        </div>

        <div className={`video-card remote ${remoteConnected ? 'active' : ''}`}>
          <div className="video-label"><span className="label-dot remote" />Remote Peer</div>
          <video ref={remoteVideoRef} autoPlay playsInline className="video-el" />
          {!remoteConnected && (
            <div className="video-placeholder">
              <div className="placeholder-icon">👤</div>
              <span>{isCallActive ? 'Waiting for peer…' : 'Not connected'}</span>
            </div>
          )}
        </div>
      </div>

      <div className="controls">
        {!isCallActive ? (
          <button className="btn-start" onClick={startCall}>
            <span className="btn-icon">📞</span>Start Call
          </button>
        ) : (
          <button className="btn-end" onClick={endCall}>
            <span className="btn-icon">📵</span>End Call
          </button>
        )}
      </div>
    </div>
  );
}

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@400;500&display=swap');

  .meeting-page {
    min-height: 100vh;
    background: #0a0a0f;
    color: #e8e8f0;
    font-family: 'Syne', sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 0 40px;
    position: relative;
    overflow: hidden;
  }
  .meeting-page::before {
    content: '';
    position: fixed;
    top: -30%; left: -20%;
    width: 60%; height: 60%;
    background: radial-gradient(ellipse, rgba(56,189,248,0.07) 0%, transparent 70%);
    pointer-events: none;
  }
  .meeting-page::after {
    content: '';
    position: fixed;
    bottom: -20%; right: -10%;
    width: 50%; height: 50%;
    background: radial-gradient(ellipse, rgba(168,85,247,0.06) 0%, transparent 70%);
    pointer-events: none;
  }
  .meeting-header {
    width: 100%;
    max-width: 960px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 24px;
    border-bottom: 1px solid rgba(255,255,255,0.07);
    backdrop-filter: blur(8px);
    position: sticky;
    top: 0;
    z-index: 10;
    background: rgba(10,10,15,0.85);
  }
  .header-left { display: flex; align-items: center; gap: 10px; font-size: 14px; color: #a0a0b8; }
  .brand-dot { width: 8px; height: 8px; border-radius: 50%; background: #38bdf8; box-shadow: 0 0 8px #38bdf8; }
  .brand-name { font-weight: 700; font-size: 16px; color: #e8e8f0; letter-spacing: 0.03em; }
  .divider { opacity: 0.3; }
  .room-label code {
    font-family: 'DM Mono', monospace;
    font-size: 12px; color: #38bdf8;
    background: rgba(56,189,248,0.1);
    padding: 2px 7px; border-radius: 4px;
  }
  .header-right { display: flex; align-items: center; gap: 14px; }
  .status-badge {
    display: flex; align-items: center; gap: 7px;
    font-size: 13px; font-weight: 600;
    padding: 5px 12px; border-radius: 20px;
    border: 1px solid rgba(255,255,255,0.1);
    background: rgba(255,255,255,0.04);
    transition: all 0.3s;
  }
  .status-badge.active { border-color: rgba(74,222,128,0.4); background: rgba(74,222,128,0.08); color: #4ade80; }
  .status-badge.idle { color: #6b6b88; }
  .status-dot { width: 7px; height: 7px; border-radius: 50%; background: currentColor; }
  .status-badge.active .status-dot { animation: pulse 1.5s infinite; }
  @keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.4; transform: scale(1.3); }
  }
  .timer {
    font-family: 'DM Mono', monospace;
    font-size: 18px; font-weight: 500;
    color: #4ade80; letter-spacing: 0.05em;
    min-width: 56px; text-align: right;
  }
  .video-grid {
    display: flex; gap: 20px; margin-top: 36px;
    flex-wrap: wrap; justify-content: center;
    padding: 0 24px; width: 100%; max-width: 960px;
    box-sizing: border-box;
  }
  .video-card {
    flex: 1 1 400px; max-width: 460px;
    position: relative; border-radius: 16px; overflow: hidden;
    background: #111118; border: 1px solid rgba(255,255,255,0.07);
    aspect-ratio: 4/3; transition: border-color 0.3s, box-shadow 0.3s;
  }
  .video-card.active { border-color: rgba(56,189,248,0.3); box-shadow: 0 0 30px rgba(56,189,248,0.08); }
  .video-card.remote.active { border-color: rgba(168,85,247,0.3); box-shadow: 0 0 30px rgba(168,85,247,0.08); }
  .video-el { width: 100%; height: 100%; object-fit: cover; display: block; }
  .video-label {
    position: absolute; bottom: 12px; left: 12px;
    display: flex; align-items: center; gap: 7px;
    background: rgba(0,0,0,0.55); backdrop-filter: blur(6px);
    padding: 5px 12px; border-radius: 20px;
    font-size: 13px; font-weight: 600; z-index: 2; letter-spacing: 0.03em;
  }
  .label-dot { width: 7px; height: 7px; border-radius: 50%; }
  .label-dot.you { background: #4ade80; }
  .label-dot.remote { background: #a855f7; }
  .video-placeholder {
    position: absolute; inset: 0;
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    gap: 12px; background: #0d0d14;
    color: #4a4a6a; font-size: 14px;
  }
  .placeholder-icon { font-size: 40px; filter: grayscale(1) opacity(0.4); }
  .controls { margin-top: 36px; display: flex; gap: 16px; justify-content: center; }
  .btn-start, .btn-end {
    display: flex; align-items: center; gap: 10px;
    padding: 14px 36px; border: none; border-radius: 12px;
    font-family: 'Syne', sans-serif; font-size: 16px; font-weight: 700;
    cursor: pointer; transition: transform 0.15s, box-shadow 0.2s, filter 0.2s;
    letter-spacing: 0.04em;
  }
  .btn-start { background: linear-gradient(135deg, #22c55e, #16a34a); color: #fff; box-shadow: 0 4px 24px rgba(34,197,94,0.3); }
  .btn-start:hover { transform: translateY(-2px); box-shadow: 0 8px 32px rgba(34,197,94,0.45); filter: brightness(1.1); }
  .btn-end { background: linear-gradient(135deg, #ef4444, #b91c1c); color: #fff; box-shadow: 0 4px 24px rgba(239,68,68,0.3); }
  .btn-end:hover { transform: translateY(-2px); box-shadow: 0 8px 32px rgba(239,68,68,0.45); filter: brightness(1.1); }
  .btn-icon { font-size: 18px; }
  .no-room {
    display: flex; flex-direction: column; align-items: center;
    justify-content: center; gap: 16px; min-height: 100vh;
    text-align: center; padding: 24px;
  }
  .no-room-icon { font-size: 56px; }
  .no-room h2 { font-size: 24px; font-weight: 700; }
  .no-room p { color: #6b6b88; font-size: 15px; max-width: 320px; }
  .btn-primary {
    margin-top: 12px; padding: 12px 28px;
    background: #38bdf8; color: #0a0a0f; border: none;
    border-radius: 10px; font-family: 'Syne', sans-serif;
    font-size: 15px; font-weight: 700; cursor: pointer;
    transition: transform 0.15s, box-shadow 0.2s;
  }
  .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(56,189,248,0.35); }
  @media (max-width: 600px) {
    .video-card { flex: 1 1 100%; max-width: 100%; }
    .video-grid { gap: 12px; }
    .meeting-header { flex-direction: column; gap: 10px; }
  }
`;