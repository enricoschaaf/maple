import { Connection } from "./../connection.ts";

export function json(conn: Connection, json: unknown): Connection {
  conn.res.headers.set("Content-Type", "application/json");
  conn.res.body = new TextEncoder().encode(JSON.stringify(json));
  return conn;
}
