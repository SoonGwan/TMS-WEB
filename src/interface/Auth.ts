import { ISuccessTypes } from './Success';

export interface ILoginTypes {
  id: string;
  password: string;
}

export interface ILoginResTypes extends ISuccessTypes {
  data: {
    'x-access-token': string;
  };
}
