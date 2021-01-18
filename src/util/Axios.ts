import axios from 'axios';
import { SERVER } from 'config/config.json';
import {
  IGetRequest,
  IPostRequest,
  IModifyRequest,
  IDeleteRequest,
} from 'interface/Axios';

export const getRequest = async ({ url, token }: IGetRequest) => {
  const data = await axios.get(`${SERVER}${url}`, {
    headers: token && {
      'x-access-token': `${token}`,
    },
  });
  return data;
};

export const postRequest = async ({ url, request, token }: IPostRequest) => {
  const data = await axios.post(`${SERVER}${url}`, request, {
    headers: token && {
      'x-access-token': `${token}`,
    },
  });
  return data;
};

export const modifyRequest = async ({
  url,
  request,
  token,
}: IModifyRequest) => {
  const data = await axios.put(`${SERVER}${url}`, request, {
    headers: token && {
      'x-access-token': `${token}`,
    },
  });
  return data;
};

export const deleteRequest = async ({ url, token }: IDeleteRequest) => {
  const data = await axios.delete(`${SERVER}${url}`, {
    headers: token && {
      'x-access-token': `${token}`,
    },
  });
  return data;
};
