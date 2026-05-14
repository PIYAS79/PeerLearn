'use client';

import { useRef, useState } from 'react';
import io from 'socket.io-client';
import { useSearchParams } from 'next/navigation';
import {redirect} from 'next/navigation';
import { useGetRequestByCallIdQuery, useUpdateRequestStatusMutation } from '@/redux/api/requestApi';


const socket = io('https://peerlearn-socket-server.onrender.com', {
  transports: ['websocket'],
});



export default function Meeting_Page() {

  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const remoteVideoRef = useRef<HTMLVideoElement | null>(null);
  const peerRef = useRef<RTCPeerConnection | null>(null);
  const [updateStatus] = useUpdateRequestStatusMutation();

  const [isCallActive, setIsCallActive] = useState(false);
  const searchParams = useSearchParams();

  const call_id = searchParams.get('call_id');
  const roomId = call_id as string;
  const {data:request_data}=useGetRequestByCallIdQuery({call_id:call_id});
  console.log(request_data);

  const startCall = async () => {
    console.log('Starting call...');

    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });

    if (localVideoRef.current) {
      localVideoRef.current.srcObject = stream;
    }

    const peer = new RTCPeerConnection({
      iceServers: [
        { urls: 'stun:stun.l.google.com:19302' },
      ],
    });

    stream.getTracks().forEach((track) => {
      peer.addTrack(track, stream);
    });

    peer.ontrack = (event) => {
      console.log('Remote stream received');
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = event.streams[0];
      }
    };

    peer.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit('ice-candidate', {
          candidate: event.candidate,
          roomId,
        });
      }
    };

    peerRef.current = peer;

    socket.emit('join-room', roomId);

    socket.on('user-joined', async () => {
      console.log('User joined, creating offer...');
      const offer = await peer.createOffer();
      await peer.setLocalDescription(offer);

      socket.emit('offer', { offer, roomId });
    });

    socket.on('offer', async (offer) => {
      console.log('Received offer');
      await peer.setRemoteDescription(offer);

      const answer = await peer.createAnswer();
      await peer.setLocalDescription(answer);

      socket.emit('answer', { answer, roomId });
    });

    socket.on('answer', async (answer) => {
      console.log('Received answer');
      await peer.setRemoteDescription(answer);
    });

    socket.on('ice-candidate', async (candidate) => {
      try {
        await peer.addIceCandidate(candidate);
      } catch (err) {
        console.error('Error adding ICE candidate', err);
      }
    });

    setIsCallActive(true);
        if(request_data?.status !=="ONGOING"){
          updateStatus({request_id:request_data?.id,status:"ONGOING"})
        }
  };

  const endCall = () => {
    console.log('Ending call...');

    peerRef.current?.close();
    peerRef.current = null;

    if (localVideoRef.current) {
      (localVideoRef.current.srcObject as MediaStream)
        ?.getTracks()
        .forEach((track) => track.stop());
      localVideoRef.current.srcObject = null;
    }

    if (remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = null;
    }

    setIsCallActive(false);
    updateStatus({request_id:request_data?.id,status:"COMPLETED"})
    redirect(`/dashboard/material?call_id=${roomId}`);
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>WebRTC Video Call</h1>

      <p>
        Status:{' '}
        <strong style={{ color: isCallActive ? 'green' : 'red' }}>
          {isCallActive ? 'Call Active' : 'Not Active'}
        </strong>
      </p>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
        <div>
          <h3 className='font-bold'>YOU</h3>
          <video
            ref={localVideoRef}
            autoPlay
            muted
            playsInline
            style={{ width: '400px', height: '300px', background: 'black', border: `2px solid green`, borderRadius: '10px' }}
          />
        </div>

        <div>
          <h3 className='font-bold'>Remote</h3>
          <video
            ref={remoteVideoRef}
            autoPlay
            playsInline
            style={{ width: '400px', height: '300px', background: 'black', border: `2px solid #3b82f6`, borderRadius: '10px' }}
          />
        </div>
      </div>

      {call_id &&
        <div style={{ marginTop: '20px' }}>
          {!isCallActive ? (
            <button className='btn bg-green-600 ' onClick={startCall} style={{ padding: '10px 20px' }}>
              Start Call
            </button>
          ) : (
            <button onClick={endCall} style={{ padding: '10px 20px' }}>
              End Call
            </button>
          )}
        </div>
      }
    </div>
  );
}