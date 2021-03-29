import express from "express";
/*import { ApolloServer,PubSub } from "apollo-server-express";
import { PubSub } from 'graphql-subscriptions';*/
const { ApolloServer, PubSub, gql } = require('apollo-server');

import { resolvers } from "./resolvers";
import { typeDefs } from "./typeDefs";
export const pubsub = new PubSub()
import connectDB from "../Connection/Connexion";
const startApolloServer = async () => {
  //const app = express();
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    subscriptions: {
      path: '/subscriptions',
      onConnect: (connectionParams, webSocket, context) => {
        console.log('Client connected');
      },
      onDisconnect: (webSocket, context) => {
        console.log('Client disconnected')
      },
    },
  });
  //server.applyMiddleware({ app });
  connectDB();

  server.listen({ port: 4000 }, () =>{
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
    
  }
   
  );
};
startApolloServer();
