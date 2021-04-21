export type Connection = {
  req: {
    pathname: string;
  };
  res: {
    body: unknown;
    headers: Headers;
  };
};
