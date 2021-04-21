import { Connection } from "./../connection.ts";
import { Plug } from "../plug.ts";

export function pipe(plugs: Plug[]) {
  return async (req: Request) => {
    return await plugs.reduce<Promise<Connection>>(
      async (previousPromise, nextAsyncFunction) => {
        const conn = await previousPromise;
        return await nextAsyncFunction(conn);
      },
      Promise.resolve({
        req: { pathname: req.url },
        res: { headers: new Headers(), body: undefined },
      } as Connection),
    );
  };
}
