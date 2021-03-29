const http = require("http");
const { ApolloServer, PubSub } = require("apollo-server-express");
const express = require("express");
import { resolvers } from "./resolvers";
import { typeDefs } from "./typeDefs";
export const pubsub = new PubSub();
import connectDB from "../Connection/Connexion";

async function startApolloServer() {
  const PORT = 4000;
  const app = express();
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
  server.applyMiddleware({ app });
  connectDB();
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