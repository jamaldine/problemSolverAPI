import { gql } from "apollo-server-express";
export const typeDefs = gql`
  type Problem {
    id: ID!
    title: String
    description: String
    media: String
  }

  # New subscriptions type
  type Subscription {
    ProblemCreated: Problem
  }

  type Query {
    problems: [Problem]
  }

  type Mutation {
    CreateProblem(title: String, description: String, media: String): Problem
  }
`;
