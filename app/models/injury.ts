import { Injury } from "./schema/Injury";
import mapper from "./mapper";

/**
 * Create a Injury in DynamoDb
 *
 * @param {string} createdBy The name of the user creating the injury
 * @param {string} athlete the userId of the athlete regrading the injury
 * @param {string} description a descrition of the injury
 * @return {Promise} A promise which resolves with the value of the user requested
 */
export async function putInjury(
  createdBy: string,
  athlete: string,
  description: string
): Promise<any> {
  const injury = Object.assign(new Injury(), {
    createdAt: new Date(),
    createdBy: createdBy,
    athlete: athlete,
    description: description
  });
  return mapper.put({ item: injury }).then((data: any) => {
    return { id: data.id };
  });
}

/**
 * Generate a query object for the DynamoDb Data Mapper to retrieve an injury by Athlete.
 *
 * @param {string} athlete the userdId of the athlete
 * @return {object} A query object for the datamapper
 */
function generateDataMapperAthleteQuery(athlete: string): object {
  const query = {
    indexName: "athlete-index",
    valueConstructor: Injury,
    keyCondition: {
      athlete: athlete
    }
  };
  return query;
}

/**
 * Retrieve an Injury by athlete
 *
 * @param {string} athlete the id of the user
 * @return {object} An object containing the Injury Data
 */
export async function getInjury(athlete: string): Promise<Injury> {
  let injury = null;
  for await (const entry of mapper.query(
    Injury,
    generateDataMapperAthleteQuery(athlete)
  )) {
    injury = entry;
  }

  if (injury) {
    console.log(injury);
    return injury;
  } else {
    console.log("Didnt find Injury report for athlete");
    // Todo: return something
  }
}
