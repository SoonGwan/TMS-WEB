const TOKEN_STORE_KEY = 'x-access-token';

export const getToken = (): string => {
  const token = (localStorage.getItem(TOKEN_STORE_KEY)
    || sessionStorage.getItem(TOKEN_STORE_KEY)) as string;

  return token;
}

const Token = () => {
  let tokenState: string = 'empty';

  const sessionToken: string | null = sessionStorage.getItem(TOKEN_STORE_KEY);
  const localToken: string | null = localStorage.getItem(TOKEN_STORE_KEY);

  if (sessionToken !== null) tokenState = 'session';

  if (localToken !== null) tokenState = 'local';
  return tokenState;
};

const isTokenEmpty: () => boolean = () => {
  return Token() === 'empty';
};

export default isTokenEmpty;
