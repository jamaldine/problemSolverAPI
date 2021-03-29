import { Solver } from "../models/Solver";

import { SOLVER_CREATED } from "../constants/constants";
import { pubsub } from "../index";

export async function createSolver({
  name,
  lastname,
  email,
  password,
  avatar,
}) {
  const solver = await Solver.create({
    name,
    lastname,
    email,
    password,
    avatar,
  })
    .then((data) => data)
    .catch((error) => {
      throw error;
    });

  pubsub.publish(SOLVER_CREATED, { SolverCreated: solver });

  return solver;
}

export const GetAllSolversInput = {
  limit: Number,
};

export function getAllSolvers({ limit }) {
  return Solver.find({})
    .limit(limit ? limit : 0)
    .then((data) => data)
    .catch((error) => {
      throw error;
    });
}
