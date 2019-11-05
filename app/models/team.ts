import { Team } from "./schema/Team";
import mapper from "./mapper";

/**
 * Create a team in DynamoDb
 *
 * @param {string} name The name of the team
 * @return {Promise} A promise which resolves with the id of the team requested
 */
export async function putTeam(name: string): Promise<any> {
  const team = Object.assign(new Team(), {
    name: name
  });
  return mapper.put({ item: team }).then((data: any) => {
    console.log(data.id);
    return { id: data.id };
  });
}

/**
 * Retrieves a Team from DynamoDB
 *
 * @param {string} teamId The ID of the team
 * @return {Promise} A promise which resolves with the value of the team requested
 */
export async function getTeam(teamId: string): Promise<any> {
  return mapper
    .get(Object.assign(new Team(), { id: teamId }))
    .then((data: any) => {
      console.log(data);
      return data;
    });
}

/**
 * Add an athlete to a team
 *
 * @param {string} teamId The id of the team to add an athlete to
 * @param {string} athleteId The id of the athlete to add to the team
 * @return {object} An object containing the team id
 */
export async function addAthlete(
  teamId: string,
  athleteId: string
): Promise<any> {
  const team = await getTeam(teamId);
  if (team) {
    team.athletes = team.athletes || [];
    team.athletes.push(athleteId);
    return mapper.update(team).then((data: any) => {
      return { id: data.id };
    });
  }
}

/**
 * Get all teams from dynamoDB
 * @return {object} An object containing all teams
 */
export async function getAllTeams(): Promise<object> {
  let teams = [];
  for await (const team of mapper.scan(Team)) {
    teams.push(team);
  }
  console.log(teams);
  return { teams: teams };
}
