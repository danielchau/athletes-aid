import { User } from "./schema/User";
import mapper from "./mapper";

/**
 * Create a user in DynamoDb
 *
 * @param {string} name The name of the User
 * @param {string} email The email address of the User
 * @return {Promise} A promise which resolves with the value of the user id
 */
export async function putUser(name: string, email: string, userType: string): Promise<string> {
  const user = Object.assign(new User(), {
    userType: userType,
    name: name,
    email: email
  });
  return mapper.put(user).then((data: User)=> {
    console.log(data.id);
    return data.id;
  });
}

/**
 * Retrieve a user by Email
 *
 * @param {string} email The email address of the User
 * @return {object} An object containing the User profile data
 */
export async function getUser(email: string): Promise<User> {
  let user = null;
  console.log(email);
  for await (const entry of mapper.query(
    User,
    { email: email },
    { indexName: "email-index" }
  )) {
    user = entry;
  }
  if (user) {
    console.log(user);
    return user;
  } else {
    console.log("Didnt find User");
  }
}

/**
 * Create a User by Email and name. Every User is unique and mapped by email, thus can only be created once.
 *
 * @param {string} email The email address of the User
 * @return {string} id of the created user
 */
export async function createUniqueUser(
  name: string,
  email: string,
  userType: string
): Promise<string> {
  const existingUser = await getUser(email);
  if (existingUser) {
    console.log("User already exists");
    return existingUser.id;
  }
  return putUser(name, email, userType);
}
