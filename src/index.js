const { AccountsServer } = require("@accounts/server");
const { AccountsPassword } = require("@accounts/password");
const { AccountsModule } = require("@accounts/graphql-api");
const http = require("http");
const { ApolloServer, PubSub } = require("apollo-server-express");
const { Mongo } = require("@accounts/mongo");
const mongoose = require("mongoose");
const { makeExecutableSchema } = require("apollo-server");
const {
  mergeTypeDefs,
  mergeResolvers,
} = require("@graphql-toolkit/schema-merging");
const express = require("express");
const cors = require("cors");

import { resolvers } from "./resolvers/resolvers";
import { typeDefs } from "./schema/typeDefs";
export const pubsub = new PubSub();

async function startApolloServer() {
  const PORT = 4000;
  const app = express();
  app.use(cors()) 
  await mongoose.connect("mongodb://localhost:27017/problemSolver", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const accountsMongo = new Mongo(mongoose.connection);

  const accountsPassword = new AccountsPassword({
    // You can customise the behavior of the password service by providing some options
  });

  const accountsServer = new AccountsServer(
    {
      // We link the mongo adapter we created in the previous step to the server
      db: accountsMongo,
      // Replace this value with a strong random secret
      tokenSecret: "my-super-random-secret",
    },
    {
      // We pass a list of services to the server, in this example we just use the password service
      password: accountsPassword,
    }
  );

  // We generate the accounts-js GraphQL module
  const accountsGraphQL = AccountsModule.forRoot({ accountsServer });

  // A new schema is created combining our schema and the accounts-js schema
  const schema = makeExecutableSchema({
    typeDefs: mergeTypeDefs([typeDefs, accountsGraphQL.typeDefs]),
    resolvers: mergeResolvers([accountsGraphQL.resolvers, resolvers]),
    schemaDirectives: {
      ...accountsGraphQL.schemaDirectives,
    },
  });

  // When we instantiate our Apollo server we use the schema and context properties
  const server = new ApolloServer({
    schema,
    //context: accountsGraphQL.context,
    context: async (session) => {
      if (!session.req) {
        const reqLike = {
          headers: session.connection.context,
        };
        return accountsGraphQL.context(reqLike);
      }
      return accountsGraphQL.context(session);
    },
  });

  await server.start();
  server.applyMiddleware({ app });
  const httpServer = http.createServer(app);
  server.installSubscriptionHandlers(httpServer);

  // Make sure to call listen on httpServer, NOT on app.
  await new Promise((resolve) => httpServer.listen(PORT, resolve));
  console.log(
    `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
  );
  console.log(
    `🚀 Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`
  );
  return { server, app, httpServer };
}
startApolloServer();
