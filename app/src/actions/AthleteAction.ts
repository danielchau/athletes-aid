import { AthleteProfile } from "../util/types";

export async function addAthleteToDb(athlete: AthleteProfile) {
    return await fetchAddAthlete(athlete);
}

async function fetchAddAthlete(
    athlete: AthleteProfile
): Promise<AthleteProfile> {
    return fetch("./athlete", {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            createdBy: "Daniel Chau", //TODO: have to change this current user
            firstName: athlete.name.substring(0, athlete.name.indexOf(" ")),
            lastName: athlete.name.substring(athlete.name.indexOf(" ") + 1),
            birthDate: new Date(athlete.birthdate),
            yearInSchool: athlete.schoolYear,
            gender: athlete.gender,
            weight: athlete.weight,
            height: athlete.height,
            email: athlete.email,
            cellPhone: 0, //athlete.cellPhone,
            homePhone: 0, //athlete.homePhone,
            address: "",
            emailNotifications: true,
            textNotifications: true,
            healthPlan: "",
            memberId: 0,
            groupNumber: 0,
            provincialHealthCardNumber: 0,
            province: "",
            primaryPhysician: "",
            emergencyContact: JSON.stringify(athlete.emergencyContact),
            injuries: [],
            teams: [],
            notes: []
        })
    })
        .then(function(response: any) {
            if (response.status !== 200) {
                console.log(
                    "Looks like there was a problem. Status Code: " +
                        response.status
                );
                return null;
            } else {
                console.log(response);
                return null;
            }
        })
        .catch(function(err: Error) {
            console.log("Fetch Error", err);
            return null;
        });
}
