import { api } from '../api';
import { login as authLogin, setUser } from '../auth';

export const authService = {
  register: async (data: object) => {
    const response = await api.post('/auth/signup', data);
    return response;
  },
  login: async (data: object) => {
    const response = await api.post('/auth/signin', data);
    if (response.data?.success) {
      setUser(response.data?.data?.user);
      authLogin(response.data?.data?.token);
    }
    return response;
  },
};
