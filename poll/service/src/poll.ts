import { APIGatewayEvent } from "aws-lambda";
import { Response, response } from "./response";
import { countVote, getSummary } from "./persister";
import { failure } from "./result-model";

export const vote = async (event: APIGatewayEvent): Promise<Response> => {
  if (!event.body) {
    return response(failure("Please provide an answer id"));
  }
  if (!event.pathParameters?.id) {
    return response(failure("Please provide a poll id"));
  }
  const { option } = JSON.parse(event.body);
  const result = await countVote(event.pathParameters.id, Number(option));
  return response(result);
};

export const summary = async (event: APIGatewayEvent): Promise<Response> => {
  if (!event.pathParameters?.id) {
    return response(failure("Please provide a poll id"));
  }
  return response(await getSummary(event.pathParameters.id));
};
