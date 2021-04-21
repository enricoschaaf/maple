import { Connection } from "./../connection.ts";

export async function file(
  conn: Connection,
  path: string,
): Promise<Connection> {
  conn.res.headers.set("Content-Type", "application/octet-stream");
  conn.res.body = await Deno.readFile(path);
  return conn;
}
