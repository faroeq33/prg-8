import { useCallback, useState } from "react";
import axios from "axios";
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  const myFetch = useCallback(() => {
    setLoading("loading...");
    setData(null);
    setError(null);
    axios
      .get(url)
      .then((res) => {
        setLoading(false);
        // checking for multiple responses for more flexibility
        // with the url we send in.
        res.data.content && setData(res.data.content);
      })
      .catch((error) => {
        setLoading(false);
        setError(error);
      });
  }, [url]);

  return { myFetch, data, loading, error };
}

export default useFetch;
