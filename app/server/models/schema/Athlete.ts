import {
  attribute,
  autoGeneratedHashKey,
  rangeKey,
  table
} from "@aws/dynamodb-data-mapper-annotations";
import { embed } from "@aws/dynamodb-data-mapper";
import { bool } from "aws-sdk/clients/signer";

class AthleteNote {
  @attribute()
  createdBy: string;
  @attribute()
  createdOn: Date;
  @attribute()
  birthDate: Date;
}

class EmergencyContact {
  @attribute()
  name: string;
  @attribute()
  email: string;
  @attribute()
  phone: string;
}

@table("Athletes")
export class Athlete {
  @autoGeneratedHashKey()
  id: string;

  @attribute({ defaultProvider: () => new Date() })
  createdAt: Date;

  @attribute()
  createdBy: string;

  @attribute()
  firstName: string;

  @attribute()
  lastName: string;

  //obvs not really storing plaintext passwords lol. will become a token or something.
  //TODO: field change once we know what needs to be stored on our end through cwl authentication
  @attribute()
  password: string;

  @attribute()
  birthDate: Date;

  @attribute()
  yearInSchool: number;

  @attribute()
  gender: string;

  @attribute()
  weight: number;

  @attribute()
  height: number;

  @attribute()
  email: string;

  @attribute()
  cellPhone: string;

  @attribute()
  homePhone: String;

  @attribute()
  address: string;

  @attribute()
  emailNotifications: bool;

  @attribute()
  textNotifications: bool;

  @attribute()
  healthPlan: string;

  @attribute()
  memberId: number;

  @attribute()
  groupNumber: number;

  @attribute()
  provincialHealthCardnumber: number;

  @attribute()
  province: string;

  @attribute()
  primaryPhysician: string;

  @attribute()
  emergencyContact: EmergencyContact;

  @attribute()
  injuries?: Array<string>;

  @attribute()
  teams: Array<string>;

  @attribute({ memberType: embed(AthleteNote) })
  notes?: Array<AthleteNote>;

  @attribute()
  availableFiles?: Array<File>;
}
