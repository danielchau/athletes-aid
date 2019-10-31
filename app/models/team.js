const { Team } = require("./schema/Team");
const { DataMapper } = require("@aws/dynamodb-data-mapper");
const AWS = require("aws-sdk");
const awsConfig = require("../aws.config").config;

AWS.config.update(awsConfig);

var client = new AWS.DynamoDB();
const mapper = new DataMapper({ client });

/**
 * Create a team in DynamoDb
 *
 * @param {string} name The name of the team
 * @return {Promise} A promise which resolves with the id of the team requested
 */
async function putTeam({ name }) {
  const team = Object.assign(new Team(), {
    name: name
  });
  return mapper.put({ item: team }).then(data => {
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
async function getTeam({teamId}) {
  return mapper.get(Object.assign(new Team(), { id: teamId })).then(data => {
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
async function addAthlete({ teamId, athleteId }) {
  const team = await getTeam({ teamId });
  if (team) {
    team.athletes =  team.athletes || [];
    team.athletes.push(athleteId);
    return mapper.update(team).then(data => {
      return { id: data.id };
    });
  }
}

/**
 * Get all teams from dynamoDB
 * @return {object} An object containing all teams
 */
async function getAllTeams() {
    teams = []
    for await (const team of mapper.scan(Team)) {
       teams.push(team)
  }
  console.log(teams);
  return {teams : teams};
}

module.exports = {
  putTeam,
  getTeam,
  addAthlete,
  getAllTeams
};
