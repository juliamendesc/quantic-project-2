import { useLoading } from './useLoading';
import { useMessage } from './useMessage';

export function useSubmissionState() {
  const { loading, startLoading, stopLoading } = useLoading();
  const { message, setSuccessMessage, setErrorMessage, clearMessage } = useMessage();
  
  const handleSubmissionStart = () => {
    startLoading();
    clearMessage();
  };
  
  const handleSubmissionSuccess = (msg: string) => {
    stopLoading();
    setSuccessMessage(msg);
  };
  
  const handleSubmissionError = (msg: string) => {
    stopLoading();
    setErrorMessage(msg);
  };
  
  return {
    loading,
    message,
    handleSubmissionStart,
    handleSubmissionSuccess,
    handleSubmissionError,
  };
}
