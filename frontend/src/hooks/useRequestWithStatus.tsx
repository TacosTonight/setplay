import { useState } from "react";

const useRequestWithStatus = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<null | boolean>(null);

  const makeRequest = async (
    requestFunction: (...args: any[]) => Promise<any>,
    ...args: any[]
  ) => {
    setLoading(true);
    setSuccess(false);
    setError(null);

    try {
      const response = await requestFunction(...args);
      setSuccess(true);
      return response;
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return { loading, success, error, makeRequest };
};

export default useRequestWithStatus;
