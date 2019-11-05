
import { User } from "./schema/User";
import mapper from "./mapper";

/**
 * Create a user in DynamoDb
 *
 * @param {string} name The name of the User
 * @param {string} email The email address of the User
 * @return {Promise} A promise which resolves with the value of the user requested
 */
export async function putUser(name : string, email : string, userType: string) {
  const user = Object.assign(new User(), {
    userType: userType,
    name: name,
    email: email
  });
  return mapper.put({ item: user }).then((data : any) => {
    console.log(data.id);
    return { id: data.id };
  });
}

/**
 * Generate a query object for the DynamoDb Data Mapper to retrieve a user by email.
 *
 * @param {string} email The email address of the user
 * @return {object} A query object for the datamapper
 */
export async function generateDataMapperEmailQuery(email : string) {
  const query = {
    indexName: "email-index",
    valueConstructor: User,
    keyCondition: {
      email: email
    }
  };
  return query;
}

/**
 * Retrieve a user by Email
 *
 * @param {string} email The email address of the User
 * @return {object} An object containing the User profile data
 */
export async function getUser(email : string) {
  let user = null;
  console.log(email);
  for await (const entry of mapper.query(User, generateDataMapperEmailQuery(email))) {
    user = entry;
  }
  if (user) {
    console.log(user)
    return user;
  } else {
    console.log("Didnt find User");
  }
}

/**
 * Create a User by Email and name. Every User is unique and mapped by email, thus can only be created once.
 *
 * @param {string} email The email address of the User
 * @return {object} An object containing the User profile data
 */
async function createUniqueUser(name: string , email: string, userType: string) {
  const existingUser = await getUser(email);
  if (existingUser) {
    console.log("User already exists")
    return existingUser;
  }

  return putUser(name, email, userType);
}

