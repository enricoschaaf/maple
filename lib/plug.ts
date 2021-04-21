import { Connection } from "./connection.ts";

export type Plug = (conn: Connection) => Connection | Promise<Connection>;
