import { Connection } from "./../connection.ts";

export function html(conn: Connection, text: string): Connection {
  conn.res.headers.set("Content-Type", "text/html");
  conn.res.body = new TextEncoder().encode(text);
  return conn;
}
