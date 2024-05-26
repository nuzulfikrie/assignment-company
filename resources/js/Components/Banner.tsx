import React, { useState, useEffect } from 'react';
import useTypedPage from '@/Hooks/useTypedPage';
import { Toast } from 'flowbite-react';
import { HiCheck, HiExclamation, HiX } from 'react-icons/hi';

interface FlashMessage {
  type: 'success' | 'fail' | 'error' | 'warning';
  message: string;
}

export default function Banner() {
  const [show, setShow] = useState(true);
  const { props } = useTypedPage();

  const flashMessages: Record<string, string | null> = props.flash || {};

  const [currentMessage, setCurrentMessage] = useState<FlashMessage | null>(null);

  useEffect(() => {
    const messageKeys = Object.keys(flashMessages).filter(
      key => flashMessages[key] !== null
    );

    if (messageKeys.length > 0) {
      let currentIndex = 0;
      setCurrentMessage({
        type: messageKeys[0] as FlashMessage['type'],
        message: flashMessages[messageKeys[0]] as string,
      });

      const interval = setInterval(() => {
        currentIndex = (currentIndex + 1) % messageKeys.length;
        setCurrentMessage({
          type: messageKeys[currentIndex] as FlashMessage['type'],
          message: flashMessages[messageKeys[currentIndex]] as string,
        });
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [flashMessages]);

  const getIcon = (type: FlashMessage['type']) => {
    switch (type) {
      case 'success':
        return <HiCheck className="h-5 w-5" />;
      case 'fail':
      case 'error':
        return <HiX className="h-5 w-5" />;
      case 'warning':
        return <HiExclamation className="h-5 w-5" />;
      default:
        return null;
    }
  };

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
      {show && currentMessage ? (
        <Toast>
          <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
            {getIcon(currentMessage.type)}
          </div>
          <div className="ml-3 text-sm font-normal">{currentMessage.message}</div>
          <Toast.Toggle onClick={() => setShow(false)} />
        </Toast>
      ) : null}
    </div>
  );
}
