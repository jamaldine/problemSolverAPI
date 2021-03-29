import { pubsub } from "../index";
import { Problem } from "../models/Problem";
import { Solver } from "../models/Solver";

import { PROBLEM_CREATED, SOLVER_CREATED } from "../constants/constants";
import {
  getAllProblems,
  GetAllProblemsInput,
  createProblem,
} from "../controllers/problemContoller";

import {
  getAllSolvers,
  GetAllSolversInput,
  createSolver,
} from "../controllers/solverController";

export const resolvers = {
  Subscription: {
    ProblemCreated: {
      // Additional event labels can be passed to asyncIterator creation
      subscribe: () => pubsub.asyncIterator([PROBLEM_CREATED]),
    },
    SolverCreated: {
      subscribe: () => pubsub.asyncIterator([SOLVER_CREATED]),
    },
  },
  Query: {
    problems: (_, { input: GetAllProblemsInput }) =>
      getAllProblems({ limit: 0 }),

    solvers: (_, { input: GetAllSolversInput }) => getAllSolvers({ limit: 0 }),
  },
  Mutation: {
    CreateProblem: async (_, { title, description, media }) =>
      await createProblem({ title, description, media }),

    CreateSolver: async (_, { name, lastname, avatar, email, password }) =>
      await createSolver({ name, lastname, avatar, email, password }),
  },
};

//problems: () => Problem.find(),
/*CreateProblem: async (_, { title, description, media }) => {
      const aproblem = new Problem({ title, description, media });
      await aproblem.save();
      return aproblem;
    },*/
