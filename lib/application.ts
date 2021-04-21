import { Options } from "./options.ts";
import { pipe } from "./utils/pipe.ts";
import { Plug } from "./plug.ts";

export interface Application {
  plugs: Plug[];
}

export class Application implements Application {
  constructor(...plugs: Plug[]) {
    this.plugs = plugs;
  }

  init(_options: Options) {
    return this;
  }

  async start() {
    console.log(`Server running on http://localhost:3000`);
    for await (const conn of Deno.listen({ port: 3000 })) {
      (async () => {
        for await (const { request, respondWith } of Deno.serveHttp(conn)) {
          const conn = await pipe(this.plugs)(request);
          respondWith(
            new Response(conn.res.body as ReadableStream<Uint8Array>, {
              headers: conn.res.headers,
            }),
          );
        }
      })();
    }
  }
}
