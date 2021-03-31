import { pubsub } from "../index";
import { PROBLEM_CREATED } from "../constants/constants";

const Subscription = {
  ProblemCreated: {
    // Additional event labels can be passed to asyncIterator creation
    subscribe: () => pubsub.asyncIterator([PROBLEM_CREATED]),
  },
};

module.exports = {
  Subscription,
};
