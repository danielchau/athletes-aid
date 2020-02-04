import { Athlete } from "./schema/Athlete";
import mapper from "./mapper";

export async function postAthlete(athlete: Athlete): Promise<string> {
  return mapper.put(athlete).then((data: Athlete) => {
    return data.id;
  });
}

export async function getAthlete(athleteId: string): Promise<Athlete> {
  return mapper
    .get(Object.assign(new Athlete(), { id: athleteId }))
    .then((athlete: Athlete) => {
      console.log(athlete);
      return athlete;
    });
}

/**
 * Update athlete info
 *
 * @param {Athlete} athlete The id of the athlete to update
 * @return {Athlete} the updated athlete info
 */
export async function updateAthlete(athlete: Athlete): Promise<Athlete> {
  return mapper.update(athlete).then(data => {
    return data;
  });
}

export async function getAllAthletes(): Promise<Array<Athlete>> {
  let athletes = new Array<Athlete>();
  for await (const entry of mapper.scan(Athlete)) {
    athletes.push(entry);
  }
  return athletes;
}
