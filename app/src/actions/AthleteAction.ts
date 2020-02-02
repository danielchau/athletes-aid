import { AthleteProfile, ListAthlete, SET_SELECTED_ATHLETE } from "../util/types";
import { transformJSONToInjury } from "./InjuriesAction";

export async function addAthleteToDb(athlete: AthleteProfile, createdBy: string) {
    return await fetchAddAthlete(athlete, createdBy);
}

async function fetchAddAthlete(athlete: AthleteProfile, createdBy: string): Promise<string | null> {
    return fetch("./athlete", {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            createdBy: createdBy,
            firstName: athlete.name.substring(0, athlete.name.indexOf(" ")),
            lastName: athlete.name.substring(athlete.name.indexOf(" ") + 1),
            birthDate: new Date(athlete.birthdate),
            yearInSchool: athlete.schoolYear,
            gender: athlete.gender,
            weight: athlete.weight,
            height: athlete.height,
            email: athlete.email,
            cellPhone: athlete.cellPhone,
            homePhone: athlete.homePhone,
            address: "",
            emailNotifications: true,
            textNotifications: true,
            healthPlan: "",
            memberId: 0,
            groupNumber: 0,
            provincialHealthCardNumber: 0,
            province: "",
            primaryPhysician: "",
            emergencyContact: {
                name: athlete.emergencyContact.name,
                address: "",
                phone: 0 // athlete.emergencyContact.cellPhone
            },
            injuries: [],
            teams: [],
            notes: []
        })
    })
        .then(response => response.json())
        .then((response: any) => {
            if (response.error) {
                console.log("Looks like there was a problem. Status Code: " + response.status);
                return null;
            } else {
                return response.data.id;
            }
        })
        .catch(function(err: Error) {
            console.log("Fetch Error", err);
            return null;
        });
}

export async function getAllAthletes(athleteId: string) {
    return await fetchAllAthletes(athleteId);
}

async function fetchAllAthletes(athleteId: string): Promise<ListAthlete[] | null> {
    return fetch("./allAthletes", {
        method: "get",
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(response => response.json())
        .then((response: any) => {
            if (response.error) {
                console.log("Looks like there was a problem. Status Code: " + response.status);
                return null;
            } else {
                console.log(response);
                return response.data.athletes.map((a: any) => ({
                    id: a.id,
                    name: a.firstName + " " + a.lastName,
                    birthdate: new Date(a.birthDate).toDateString()
                }));
            }
        })
        .catch(function(err: Error) {
            console.log("Fetch Error", err);
            return null;
        });
}

export async function getAthlete(athleteId: string) {
    return await fetchAthlete(athleteId);
}

async function fetchAthlete(athleteId: string): Promise<AthleteProfile | null> {
    let params: any = {
        athleteId: athleteId
    };
    let query = Object.keys(params)
        .map((k: any) => encodeURIComponent(k) + "=" + encodeURIComponent(params[k]))
        .join("&");

    return fetch("./athlete?" + query, {
        method: "get"
    })
        .then(response => response.json())
        .then((response: any) => {
            if (response.error) {
                console.log("Looks like there was a problem. Status Code: " + response.status);
                return null;
            } else {
                let data = response.data.athlete;
                return {
                    id: data.id,
                    profilePicture: "",
                    name: data.firstName + " " + data.lastName,
                    birthdate: new Date(data.birthDate).toDateString(),
                    schoolYear: data.yearInSchool,
                    gender: data.gender,
                    weight: data.weight,
                    height: data.height,
                    email: data.email,
                    cellPhone: data.cellPhone,
                    homePhone: data.homePhone,
                    healthCardNumber: data.healthPlan,
                    emergencyContact: {
                        name: data.emergencyContact.name,
                        cellPhone: data.emergencyContact.phone.toString(),
                        homePhone: "",
                        email: ""
                    },
                    files: [],
                    injuries: transformJSONToInjury(data.injuries)
                };
            }
        })
        .catch(function(err: Error) {
            console.log("Fetch Error", err);
            return null;
        });
}

export function setSelectedAthlete(athleteId: string) {
    return { type: SET_SELECTED_ATHLETE, athleteId };
}
