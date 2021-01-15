const Token = () => {
  let tokenState: string = 'empty';

  const sessionToken: string | null = sessionStorage.getItem('x-access-token');
  const localToken: string | null = localStorage.getItem('x-access-token');

  if (sessionToken !== null) tokenState = 'session';

  if (localToken !== null) tokenState = 'local';

  return tokenState;
};

export default Token;
