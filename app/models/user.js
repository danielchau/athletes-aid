const {User} = require('./dynamodb/mapper/User');
const {DataMapper} = require('@aws/dynamodb-data-mapper');
const DynamoDB = require('aws-sdk/clients/dynamodb');

const client = new DynamoDB({region: 'ca-central-1'});
const mapper = new DataMapper({client});

module.exports = (options) => {
    /**
     * Create a user in DynamoDb
     *
     * @param {string} name The name of the User
     * @param {string} email The email address of the User
     * @return {Promise} A promise which resolves with the value of the user requested
     */
    async function putUser({name, email, userType}) {
        const user = Object.assign(new User(), {
            userType: userType,
            name: name,
            email: email,
        });
        return mapper.put({item: user}).then((data) => {
            return {id: data.id};
        });
    }

    /**
     * Generate a query object for the DynamoDb Data Mapper to retrieve a user by email.
     *
     * @param {string} email The email address of the user
     * @return {object} A query object for the datamapper
     */
    function generateDataMapperEmailQuery(email) {
        const query = {
            indexName: 'EmailIndex',
            valueConstructor: User,
            keyCondition: {
                email: email,
            },
        };
        return query;
    }

    /**
     * Retrieve a user by Email
     *
     * @param {string} email The email address of the User
     * @return {object} An object containing the User profile data
     */
    async function getUser({email}) {
        let user = null;
        for await (const entry of mapper.query(generateDataMapperEmailQuery(email))) {
            user = entry;
        }

        if (user) {
            return user;
        } else {
            console.log('Didnt find User');
            // Todo: improve handling of this. No return value is fishy.
        }
    }

    /**
     * Create a User by Email and name. Every User is unique and mapped by email, thus can only be created once.
     *
     * @param {string} name The name of the User
     * @param {string} email The email address of the User
     * @return {object} An object containing the User profile data
     */
    async function createUniqueUser({name, email}) {
        const existingUser = await getUser({email});
        if (existingUser) {
            return existingUser;
        }
        return putUser({name, email});
    }

    return {
        putUser,
        getUser,
        createUniqueUser,
    };
};