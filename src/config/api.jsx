// apiRequest.js
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_Local_URL;

const apiRequest = async ({
  method = 'get',
  endpoint = '',
  params = {},
  data = {},
  setLoading = false,
  onSuccess = () => {},
  onError = (err) => console.error(err),
}) => {
  try {
    setLoading(true);

    const response = await axios({
      method,
      url: `${BASE_URL}${endpoint}`,
      params,
      data,
    });

    onSuccess(response.data);
  } catch (err) {
    onError(err);
  } finally {
    setLoading(false);
  }
};

export default apiRequest;
