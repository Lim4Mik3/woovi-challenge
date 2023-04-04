import "reflect-metadata";

import Koa from "koa";
import mount from "koa-mount";
import { graphqlHTTP } from "koa-graphql";
import KoaPlaygroundMiddleware from "graphql-playground-middleware-koa";
import { buildSchema } from "type-graphql";
import { resolvers } from "./resolvers";
import { ErrorsInterceptor } from "./middlewares/errors-middleware";

const app = new Koa();
const _SERVER_PORT = 4000;

async function startup() {
  const schema = await buildSchema({
    resolvers,
    globalMiddlewares: [ErrorsInterceptor],
  });

  app.use(
    mount(
      "/graphql",
      graphqlHTTP({
        schema,
        graphiql: true,
        context: {},
      })
    )
  );

  app.use(
    mount(
      "/playground",
      KoaPlaygroundMiddleware({
        endpoint: "/playground",
        subscriptionEndpoint: "/subscriptions",
      })
    )
  );
}

startup()
  .then(() => {
    app.listen(_SERVER_PORT);

    console.info(
      `✅ Server is running at: http://localhost:${_SERVER_PORT} 🔥`
    );
  })
  .catch((err) => {
    console.error(
      `❌ Ooh dude... something went wrong on server initalize 😭`,
      err
    );
  });
