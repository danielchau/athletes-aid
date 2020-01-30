import { Injury } from "./schema/Injury";
import { InjuryNote } from "./schema/Injury";
import {
  between,
  ConditionExpression,
  ConditionExpressionPredicate
} from "@aws/dynamodb-expressions";
import mapper from "./mapper";
import { Logger } from "@overnightjs/logger";


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
  teamId: string
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
    { teamId: teamId },
    { filter: equalsExpression, indexName: "teamId-index" }
  )) {
    injuries.push(entry);
  }

  return injuries;
}
/**
 * Adds an InjuryNote to an existing Injury from DynamoDB
 *
 * @param {string} injuryId The ID of the injury
 * @param {InjuryNote} injuryId The InjuryNote to add to the injury
 * @return {Promise} A promise which resolves with the injury
 */
export async function addInjuryNote(
  injuryNote: InjuryNote,
  injuryId: string
): Promise<Injury> {
  
  let injury : Injury;

  for await (const entry of mapper.query(
    Injury,
    { id: injuryId },
  )) {
    injury = entry;
  }

  if (injury) {

    if(!injury.otherNotes) {
      injury.otherNotes = Array<InjuryNote>();
    }
      
    injury.otherNotes.push(injuryNote);
    
    return mapper.update(injury).then(injury => {
      return injury;
    });
  } else {
    throw new Error("Injury does not exist");
  }
}

/**
 * Retrieves a Injury from DynamoDB
 *
 * @param {string} injuryId The ID of the injury
 * @return {Promise} A promise which resolves with the team requested
 */
export async function getInjury(injuryId: string): Promise<Injury> {
  return mapper
    .get(Object.assign(new Injury(), { id: injuryId }))
    .then((injury: Injury) => {
      console.log(injury);
      return injury;
    });
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
