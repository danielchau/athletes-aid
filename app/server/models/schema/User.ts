import {
  attribute,
  hashKey,
  table
} from "@aws/dynamodb-data-mapper-annotations";

export enum roles {
  Trainer = "trainer",
  Admin = "admin",
  Coach = "coach",
}

@table("Users")
export class User {
  @hashKey()
  cwl: string;

  @attribute()
  firstName?: string;

  @attribute()
  lastName?: string;

  @attribute()
  email?: string;

  @attribute()
  teams?: Array<string>;

  @attribute()
  role: string;
}
