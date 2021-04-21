import { Connection } from "./connection.ts";
import { file } from "./response/file.ts";
import { fs, path } from "../deps.ts";
import { Plug } from "./plug.ts";

type Routes = Map<string, Plug>;

export interface Router {
  routes: Routes;
  directory: string;
  route: (pathname: string, handler: Plug) => void;
}

export class Router implements Router {
  constructor() {
    this.routes = new Map();
  }

  route = (pathname: string, handler: Plug) => {
    this.routes.set(pathname, handler);
  };

  static = (directory: string) => {
    this.directory = directory;
  };

  plug: Plug = async (conn: Connection) => {
    const handler = this.routes.get(conn.req.pathname);

    if (handler) {
      return handler(conn);
    }

    if (!this.directory) return conn;

    const filePath = path.join(this.directory, conn.req.pathname);

    if (fs.exists(filePath)) {
      return file(conn, filePath);
    }

    for await (
      const { path } of fs.expandGlob(`${filePath}.*`)
    ) {
      return file(conn, path);
    }

    return conn;
  };
}
