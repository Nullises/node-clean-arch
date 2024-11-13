import { envs } from "./config/envs";
import { Server } from "./presentation/server";

(() => {
  main();
})();

async function main() {
  // TODO: await DB connection

  // Server Connection
  new Server({
    port: envs.port,
  }).start();
}
