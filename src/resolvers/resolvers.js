import { pubsub } from "../index";
import { Problem } from "../models/Problem";

import { PROBLEM_CREATED } from "../constants/constants";
import {
  getAllProblems,
  GetAllProblemsInput,
  createProblem,
} from "../controllers/problemContoller";

export const resolvers = {
 Subscription: {
    ProblemCreated: {
      // Additional event labels can be passed to asyncIterator creation
      subscribe: () => pubsub.asyncIterator([PROBLEM_CREATED]),
    },
  },
  Query: {
    problems: (_, { input: GetAllProblemsInput }) =>
      getAllProblems({ limit: 0 }),
  },
  Mutation: {
    CreateProblem: async (_, { title, description, media }) =>
      await createProblem({ title, description, media }),
  },
};

//problems: () => Problem.find(),
/*CreateProblem: async (_, { title, description, media }) => {
      const aproblem = new Problem({ title, description, media });
      await aproblem.save();
      return aproblem;
    },*/
