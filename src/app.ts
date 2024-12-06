import { envs } from "./config/envs";
import { MongoDatabase } from "./data";
import { AppRoutes } from "./presentation/routes";
import { Server } from "./presentation/server";

(() => {
  main();
})();

async function main() {
  const connect = await MongoDatabase.connect({
    dbName: envs.mongoDbName,
    url: envs.mongoUrl,
  });

  // Server Connection
  new Server({
    port: envs.port,
    routes: AppRoutes.routes,
  }).start();
}
