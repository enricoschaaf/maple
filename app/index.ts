import { Application, html, json, Router, text } from "../mod.ts";

const router = new Router();

const app = new Application(router.plug);

router.route("/text", (conn) => {
  return text(conn, "Hello world!");
});

router.route("/json", (conn) => {
  return json(conn, { json: "Hello world!" });
});

router.route("/html", (conn) => {
  return html(conn, "<h1>Hello world!</h1>");
});

router.static("public");

await app.start();
