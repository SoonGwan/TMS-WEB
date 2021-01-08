export interface IGetResponse {
  url: string;
  token: string;
}

export interface IPostRequest {
  url: string;
  request: object;
  token: string;
}

export interface IModifyReqeust {
  url: string;
  request: object;
  token: string;
}

export interface IDeleteReqeust {
  url: string;
  token: string;
}
