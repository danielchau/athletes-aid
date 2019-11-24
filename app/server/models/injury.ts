import { Injury } from "./schema/Injury";
import {
  between,
  ConditionExpression,
  ConditionExpressionPredicate
} from "@aws/dynamodb-expressions";
import mapper from "./mapper";
import { Logger } from "@overnightjs/logger";
import { loggerModeArr } from "@overnightjs/logger/lib/constants";

/**
 * Create a Injury in DynamoDb
 *
 * @param {string} createdBy The name of the user creating the injury
 * @param {string} athlete the userId of the athlete regrading the injury
 * @param {string} description a descrition of the injury
 * @return {Promise} A promise which contains the id of the user requested
 */
export async function putInjury(injury: Injury): Promise<string> {
  return mapper.put(injury).then((data: Injury) => {
    return data.id;
  });
}

export async function getInjuriesByRange(
  startDate: string,
  endDate: string,
  teamName: string
): Promise<Array<Injury>> {
  let startTime = new Date(startDate).getTime() / 1000;
  let endTime = new Date(endDate).getTime() / 1000;

  let injuries = new Array<Injury>();

  const equalsExpressionPredicate = between(startTime, endTime);
  const equalsExpression: ConditionExpression = {
    ...equalsExpressionPredicate,
    subject: "injuryDate"
  };

  Logger.Info(equalsExpression);

  for await (const entry of mapper.query(
    Injury,
    { teamName: teamName },
    { filter: equalsExpression, indexName: "teamName-index" }
  )) {
    injuries.push(entry);
  }

  return injuries;
}

/**
 * Retrieve an Injury by athlete
 *
 * @param {string} athlete the id of the user
 * @return {Injury} An Injury object containing the Injury Data
 */
//TODO
// export async function getInjury(athlete: string): Promise<Injury> {
//   let injury = null;
//   for await (const entry of mapper.query(
//     Injury,
//     { athlete: athlete },
//     { indexName: "athlete-index" }
//   )) {
//     injury = entry;
//   }

//   if (injury) {
//     console.log(injury);
//     return injury;
//   } else {
//     console.log("Didnt find Injury report for athlete");
//     // Todo: return something
//   }
// }
