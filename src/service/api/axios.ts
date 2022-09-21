import axios, { AxiosResponse } from 'axios';
import environment from 'environment';

type AxiosGetApiType = {
  endPoint: string;
  headers?: {
    [key: string]: string;
  };
};

type AxiosPostApiType = {
  endPoint: string;
  headers?: {
    [key: string]: string;
  };
  data?: {
    [key: string]: string;
  };
};

export const axiosGetApi = async ({
  endPoint,
  headers = {},
}: AxiosGetApiType): Promise<AxiosResponse> =>
  await axios.get(`${environment.baseUrl}${endPoint}`, {
    headers: headers,
  });

export const axiosPostApi = async ({
  endPoint,
  headers = {},
  data = {},
}: AxiosPostApiType): Promise<AxiosResponse> =>
  await axios.post(`${environment.baseUrl}${endPoint}`, {
    headers: headers,
    data: data,
  });

// put, patch, delete ...
