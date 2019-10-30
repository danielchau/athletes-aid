const {Injury} = require('./dynamodb/mapper/Injury');
const {DataMapper} = require('@aws/dynamodb-data-mapper');
const DynamoDB = require('aws-sdk/clients/dynamodb');

const client = new DynamoDB({region: 'ca-central-1'});
const mapper = new DataMapper({client});

module.exports = (options) => {
    /**
     * Create a user in DynamoDb
     *
     * @param {string} createdBy The name of the user creating the injury
     * @param {string} athlete the userId of the athlete regrading the injury
     * @param {string} description a descrition of the injury
     * @return {Promise} A promise which resolves with the value of the user requested
     */
    async function putInjury({createdBy, athlete, description}) {
        const injury = Object.assign(new Injury(), {
            createdAt: new Date(),
            createdBy: created,
            athlete: athlete,
            description: description
        });
        return mapper.put({item: injury}).then((data) => {
            return {id: data.id};
        });
    }

    /**
     * Generate a query object for the DynamoDb Data Mapper to retrieve an injury by Athlete.
     *
     * @param {string} athlete the userdId of the athlete
     * @return {object} A query object for the datamapper
     */
    function generateDataMapperAthleteQuery(email) {
        const query = {
            indexName: 'AthleteIndex',
            valueConstructor: Injury,
            keyCondition: {
                athlete: athlete,
            },
        };
        return query;
    }

    /**
     * Retrieve an Injury by athlete
     *
     * @param {string} athlete the id of the user
     * @return {object} An object containing the Injury Data
     */
    async function getInjury({athlete}) {
        let injury = null;
        for await (const entry of mapper.query(generateDataMapperAthleteQuery(athlete))) {
            injury = entry;
        }

        if (injury) {
            return injury;
        } else {
            console.log('Didnt find Injury report for athlete');
            // Todo: return something
        }
    }

    return {
        putInjury,
        getInjury,
    };
};