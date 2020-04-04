import { User } from "./schema/User";
import mapper from "./mapper";

/**
 * Create a user in DynamoDb
 *
 * @param {User} user The user to add to the database
 * @return {Promise} A promise which resolves with the value of the user cwl
 */
export async function putUser(user: User): Promise<string> {
  return mapper.put(user).then((data: User) => {
    console.log(data.cwl);
    return data.cwl;
  });
}

/**
 * Retrieve a user by CWL
 *
 * @param {string} cwl The cwl id of the User
 * @return {object} An object containing the User profile data
 */

export async function getUser(cwl: string): Promise<User> {
  return mapper
    .get(Object.assign(new User(), { cwl: cwl }))
    .then((user: User) => {
      console.log(user);
      return user;
    });
}


/**
 * Updates an existing User
 *
 * @param {User} user the User to update
 * @return {string} cwl id of the updated user
 */
export async function updateUser(user: User): Promise<string> {
  const oldUser = await getUser(user.cwl);
  if (oldUser) {
    return mapper.update(user).then(data => {
      return data.cwl;
    });
  } else {
    throw new Error("User cwl does not exist");
  }
}

/**
 * Deletes a User from DynamoDB
 *
 * @param {string} cwl  The CWL ID of the user
 */
export async function deleteUser(cwl: string) {
  await mapper.delete(Object.assign(new User(), { cwl: cwl }));
}

/**
 * Gets all Users from the data base
 * @returns {Promise<Array<User>>} object containing the users
 */
export async function getAllUsers(): Promise<Array<User>> {
  let users = new Array<User>();
  for await (const entry of mapper.scan(User)) {
    users.push(entry);
  }
  return users;
}
