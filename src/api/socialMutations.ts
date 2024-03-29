// libs
import axios from 'axios';

// types
import User from '@/types/user';
import generateHmac from '@/utils/hmac';

export type ResponseData = {
  token: string;
  user: User;
  message: string;
  success: boolean;
  created: boolean;
};

export type ResponseObject = {
  success: boolean;
  data: ResponseData;
};

export type Data = Record<string, string>;

const apiHandler = async (data: Data, url: string, method?: string) => {
  const response: ResponseObject = await axios({
    url,
    params: {
      ...generateHmac(),
    },
    baseURL: import.meta.env.VITE_SERVER_API as string,
    data,
    method: method || 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });

  const { success } = response.data;

  if (!success) {
    throw new Error('An error occured. Please try again.');
  }

  return response.data;
};

export async function loginFormUserApi(data: Data) {
  const result = await apiHandler(data, '/auth/login');
  return result;
}

export async function registerUserApi(data: Data) {
  const result = await apiHandler(data, '/user/create');
  return result;
}

export async function socialLoginApi(data: Data) {
  const result = await apiHandler(data, '/social-login/login');
  return result;
}
