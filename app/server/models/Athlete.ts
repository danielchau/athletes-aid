import { Athlete } from "./schema/Athlete";
import {
  between,
  ConditionExpression,
  ConditionExpressionPredicate
} from "@aws/dynamodb-expressions";
import mapper from "./mapper";
import { Logger } from "@overnightjs/logger";
import { loggerModeArr } from "@overnightjs/logger/lib/constants";


export async function putAthlete(athlete: Athlete): Promise<string> {
  return mapper.put(athlete).then((data: Athlete) => {
    return data.id;
  });


}

