import axios from 'axios';
import { mainApiUrl } from './globalConstants';

const axiosApi = axios.create({
  baseURL: mainApiUrl,
});

export default axiosApi;