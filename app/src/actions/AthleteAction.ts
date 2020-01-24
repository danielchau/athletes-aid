import { AthleteProfile, ListAthlete } from "../util/types";

export async function addAthleteToDb(athlete: AthleteProfile) {
    return await fetchAddAthlete(athlete);
}

async function fetchAddAthlete(athlete: AthleteProfile): Promise<string | null> {
    return fetch("./athlete", {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            createdBy: "Daniel Chau", //TODO: have to change this to current user
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
                phone: athlete.emergencyContact.cellPhone
            },
            injuries: [],
            teams: [],
            notes: []
        })
    })
        .then(function(response: any) {
            if (response.status !== 200) {
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
        method: "post",
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(function(response: any) {
            if (response.status !== 200) {
                console.log("Looks like there was a problem. Status Code: " + response.status);
                return null;
            } else {
                return response.data.athletes.map(a => ({
                    id: a.id,
                    name: a.firstName + " " + a.lastName,
                    birthdate: a.birthdate.toDateString()
                }));
            }
        })
        .catch(function(err: Error) {
            console.log("Fetch Error", err);
            return null;
        });
}
