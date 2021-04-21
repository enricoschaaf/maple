import { Connection } from "./../connection.ts";

export function text(conn: Connection, text: string): Connection {
  conn.res.headers.set("Content-Type", "text/plain");
  conn.res.body = new TextEncoder().encode(text);
  return conn;
}
