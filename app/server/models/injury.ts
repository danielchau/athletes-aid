import { Injury } from "./schema/Injury";
import mapper from "./mapper";

/**
 * Create a Injury in DynamoDb
 *
 * @param {string} createdBy The name of the user creating the injury
 * @param {string} athlete the userId of the athlete regrading the injury
 * @param {string} description a descrition of the injury
 * @return {Promise} A promise which contains the id of the user requested
 */
export async function putInjury(
  injury : Injury
): Promise<string> {
  return mapper.put(injury).then((data: Injury) => {
    return data.id;
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
