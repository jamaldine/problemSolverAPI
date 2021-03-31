import { createProblem } from "../controllers/problemContoller";

const Mutation = {
  CreateProblem: async (_, { title, description, media }) =>
    await createProblem({ title, description, media }),
};

module.exports = {
  Mutation,
};
