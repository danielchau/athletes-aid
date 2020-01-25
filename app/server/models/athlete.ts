import { Athlete } from "./schema/Athlete";
import mapper from "./mapper";

export async function putAthlete(athlete: Athlete): Promise<string> {
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

export async function getAllAthletes(): Promise<Array<Athlete>> {
  let athletes = new Array<Athlete>();
  for await (const entry of mapper.scan(Athlete)) {
    athletes.push(entry);
  }
  return athletes;
}
