import { gql } from "apollo-server-express";
//This is the schema:
export const typeDefs = gql`
  type Problem {
    id: ID!
    title: String
    description: String
    media: String
  }

  type Solver {
    id: ID!
    name: String
    lastname: String
    email: String
    avatar: String
    password: String
  }

  # New subscriptions type
  type Subscription {
    ProblemCreated: Problem
    SolverCreated: Solver
  }

  type Query {
    problems: [Problem]
    solvers: [Solver]
  }

  type Mutation {
    CreateProblem(title: String, description: String, media: String): Problem
    CreateSolver(
      name: String
      lastname: String
      email: String
      avatar: String
      password: String
    ): Solver
  }
`;
