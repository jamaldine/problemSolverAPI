import { Problem } from "../models/Problem";

import { PROBLEM_CREATED } from "../constants/constants";
import { pubsub } from "../index";

// Create a new problem from the given input
export async function createProblem({ title, description, media }) {
  /*const aproblem = new Problem({ title, description, media });
    await aproblem.save();
    return aproblem;*/

  const problem = await Problem.create({
    title,
    description,
    media,
  })
    .then((data) => data)
    .catch((error) => {
      throw error;
    });

  pubsub.publish(PROBLEM_CREATED, { ProblemCreated: problem });

  return problem;
}

export const GetAllProblemsInput = {
  limit: Number,
};

export function getAllProblems({ limit }) {
  return Problem.find({})
    .limit(limit ? limit : 0)
    .then((data) => data)
    .catch((error) => {
      throw error;
    });
}
