import {
  getAllProblems,
  GetAllProblemsInput,
} from "../controllers/problemContoller";

const Query = {
  problems: (_, { input: GetAllProblemsInput }) => getAllProblems({ limit: 0 }),
};

module.exports = {
  Query,
};
