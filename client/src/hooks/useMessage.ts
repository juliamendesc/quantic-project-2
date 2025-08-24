import { useState } from 'react';

export function useMessage(initialMessage = '') {
  const [message, setMessage] = useState(initialMessage);
  
  return {
    message,
    setMessage,
    clearMessage: () => setMessage(''),
    setSuccessMessage: (msg: string) => setMessage(msg),
    setErrorMessage: (msg: string) => setMessage(msg),
  };
}
