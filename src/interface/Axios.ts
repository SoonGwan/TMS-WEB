export interface IGetRequest {
  url: string;
  token?: string;
}

export interface IPostRequest {
  url: string;
  request: object;
  token?: string;
}

export interface IModifyRequest {
  url: string;
  request: object;
  token?: string;
}

export interface IDeleteRequest {
  url: string;
  token?: string;
}
