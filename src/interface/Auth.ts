import { ISuccessTypes } from './Success';

export interface ILoginTypes {
  id: string;
  pw: string;
}

export interface ILoginResTypes extends ISuccessTypes {
  data: {
    'x-access-token': string;
  };
}
