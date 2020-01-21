import { Team } from "./schema/Team";
import mapper from "./mapper";

/**
 * Create a team in DynamoDb
 *
 * @param {string} name The name of the team
 * @return {Promise} A promise which resolves with the id of the team requested
 */
export async function putTeam(team: Team): Promise<string> {
  return await mapper.put(team).then((data: Team) => {
    console.log(data);
    return data.id;
  });
}

/**
 * Retrieves a Team from DynamoDB
 *
 * @param {string} teamId The ID of the team
 * @return {Promise} A promise which resolves with the team requested
 */
export async function getTeam(teamId: string): Promise<Team> {
  return mapper
    .get(Object.assign(new Team(), { id: teamId }))
    .then((team: Team) => {
      console.log(team);
      return team;
    });
}

/**
 * Deletes a Team from DynamoDB
 *
 * @param {string} teamId The ID of the team
 * @return {Promise} A promise which resolves with the team requested
 */
export async function deleteTeam(teamId: string) {
  await mapper.delete(Object.assign(new Team(), { id: teamId }));
}

/**
 * Add an athlete to a team
 *
 * @param {string} teamId The id of the team to add an athlete to
 * @param {string} athleteId The id of the athlete to add to the team
 * @return {string} A string containing the team id
 */
export async function addAthlete(
  teamId: string,
  athleteId: string
): Promise<string> {
  const team = await getTeam(teamId);
  if (team) {
    team.athletes = team.athletes;
    team.athletes.push(athleteId);
    return mapper.update(team).then(data => {
      return data.id;
    });
  }
}

/**
 * Update an existing team
 *
 * @param {string} teamId The id of the team to add an athlete to
 * @param {[string]} athleteIds The ids of the athlete to add to the team
 * @param {string} season The season to be changed
 * @param {string} name The name of the team to be changed
 * @return {string} A string containing the team id
 */
export async function updateTeam(
  teamId: string,
  athleteIds: [string],
  season: string,
  name: string
): Promise<string> {
  const team = await getTeam(teamId);
  if (team) {
    team.athletes = athleteIds || team.athletes;
    team.season = season || team.season;
    team.name = name || team.name;
    return mapper.update(team).then(data => {
      return data.id;
    });
  } else {
    throw new Error("Team Id does not exist");
  }
}

/**
 * Get all teams from dynamoDB
 * @return {object} An object containing all teams
 */
export async function getAllTeams(): Promise<Team[]> {
  let teams = [];
  for await (const team of mapper.scan(Team)) {
    teams.push(team);
  }
  console.log(teams);
  return teams;
}
