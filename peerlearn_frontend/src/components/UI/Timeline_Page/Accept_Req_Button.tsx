'use client';

import { useState } from 'react';
import { DatePicker, Input, Modal } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { Zap } from 'lucide-react';
import { useUpdateRequestStatusMutation } from '@/redux/api/requestApi';
import { getFromLocalStorage } from '@/utils/local-storage';
import { toast } from 'sonner';

const { TextArea } = Input;

type Props = {
  request_id: string,
  from_dashboard?: boolean,
};

const Accept_Req_Button = ({ request_id, from_dashboard }: Props) => {
  const [acceptRequest] = useUpdateRequestStatusMutation();

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);

  const [message, setMessage] = useState('');
  const [callDateTime, setCallDateTime] = useState<Dayjs | null>(null);

  const my_id = getFromLocalStorage('person_id');

  // First Modal -> Are you sure?
  const handleFirstOk = () => {
    setIsConfirmModalOpen(false);
    setIsMessageModalOpen(true);
  };

  // Second Modal -> Submit
  const handleFinalConfirm = async () => {
    const formattedDate = callDateTime
      ? dayjs(callDateTime).format('DD MMM YYYY [at] hh:mm A')
      : '';

    try {
      const { data } = await acceptRequest({
        request_id,
        status: 'ACCEPTED',
        target_user_id: my_id,
        call_start_at: formattedDate,
        message,
      });
      if (data?.status === 'success') {
        toast.success('Request accepted successfully!');
      }
      setMessage('');
      setCallDateTime(null);
      setIsMessageModalOpen(false);
    } catch (error) {
      toast.error('Failed to accept request.');
      console.log(error);
    }
  };

  return (
    <div>
      {/* Button */}
      {/* {from_dashboard &&  */}
      <button
        onClick={() => setIsConfirmModalOpen(true)}
        className={`w-full cursor-pointer bg-indigo-600 hover:bg-indigo-500 text-white py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/10 group/btn ${from_dashboard ? 'hidden' : ''
          }`}
      >
        <Zap className='w-4 h-4 group-hover/btn:scale-125 transition-transform' />
        Accept Request
      </button>
      {/* } */}

      {/* First Modal */}
      <Modal
        title={<span>Are you sure?</span>}
        open={isConfirmModalOpen}
        onOk={handleFirstOk}
        onCancel={() => setIsConfirmModalOpen(false)}
        okText='Yes'
        cancelText='No'
      >
        <p>
          Do you really want to accept this request?
        </p>
      </Modal>

      {/* Second Modal */}
      <Modal
        title={<span >Send Message</span>}
        open={isMessageModalOpen}
        onOk={handleFinalConfirm}
        onCancel={() => {
          setIsMessageModalOpen(false);
          setMessage('');
          setCallDateTime(null);
        }}
        okText='Confirm'
      >
        {/* Date & Time */}
        <div className='mb-4'>
          <label className='block mb-2 font-medium '>
            Call Date & Time
          </label>

          <DatePicker
            showTime
            format='DD MMM YYYY [at] hh:mm A'
            value={callDateTime}
            onChange={(value) => setCallDateTime(value)}
            className='w-full'
          />
        </div>

        {/* Message */}
        <div>
          <label className='block mb-2 font-medium '>
            Message (optional)
          </label>

          <TextArea
            rows={4}
            placeholder='Write a message...'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
      </Modal>
    </div>
  );
};

export default Accept_Req_Button;