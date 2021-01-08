import axios from 'axios';
import { SERVER } from 'config/config.json';
import {
  IGetResponse,
  IPostRequest,
  IModifyReqeust,
  IDeleteReqeust,
} from 'interface/Axios';

export const getResponse = async ({ url, token }: IGetResponse) => {
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
}: IModifyReqeust) => {
  const data = await axios.put(`${SERVER}${url}`, request, {
    headers: token && {
      'x-access-token': `${token}`,
    },
  });
  return data;
};

export const deleteRequest = async ({ url, token }: IDeleteReqeust) => {
  const data = await axios.delete(`${SERVER}${url}`, {
    headers: token && {
      'x-access-token': `${token}`,
    },
  });
  return data;
};
