import { AthleteProfile, ListAthlete, SET_SELECTED_ATHLETE } from "../util/types";
import { transformJSONToInjury } from "./InjuriesAction";
import download from "downloadjs";

/**
 * REDUX ACTIONS
 */

export function setSelectedAthlete(athleteId: string) {
    return { type: SET_SELECTED_ATHLETE, athleteId };
}

/**
 * FETCH ACTIONS TO SERVER
 */

export async function addAthleteToDb(athlete: AthleteProfile, createdBy: string) {
    return await fetchAddAthlete(athlete, createdBy);
}

async function fetchAddAthlete(athlete: AthleteProfile, createdBy: string): Promise<string | null> {
    return fetch("./athlete", {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: transformAthleteProfileToJSON(athlete, createdBy, false)
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

export async function updateAthlete(athlete: AthleteProfile, createdBy: string) {
    return await putAthlete(athlete, createdBy);
}

async function putAthlete(athlete: AthleteProfile, createdBy: string): Promise<string | null> {
    return fetch("./athlete", {
        method: "put",
        headers: {
            "Content-Type": "application/json"
        },
        body: transformAthleteProfileToJSON(athlete, createdBy, true)
    })
        .then(response => response.json())
        .then((response: any) => {
            if (response.error) {
                console.log("Looks like there was a problem. Status Code: " + response.status);
                return null;
            } else {
                console.log(response.data);
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
                    schoolYear: !!data.yearInSchool ? data.yearInSchool : "",
                    gender: !!data.gender ? data.gender : "",
                    weight: !!data.weight ? data.weight : 0,
                    height: !!data.height ? data.height : 0,
                    email: !!data.email ? data.email : "",
                    cellPhone: !!data.cellPhone ? data.cellPhone : "",
                    homePhone: !!data.homePhone ? data.homePhone : "",
                    healthCardNumber: !!data.healthCardNumber ? data.healthCardNumber : "",
                    emergencyContact: {
                        name: !!data.emergencyContact.name ? data.emergencyContact.name : "",
                        phone: !!data.emergencyContact.phone ? data.emergencyContact.phone : "",
                        email: !!data.emergencyContact.email ? data.emergencyContact.email : ""
                    },
                    files: !!data.availableFiles
                        ? data.availableFiles.map((f: string) => f.split("/")[1])
                        : [],
                    injuries: transformJSONToInjury(data.injuries)
                };
            }
        })
        .catch(function(err: Error) {
            console.log("Fetch Error", err);
            return null;
        });
}

export async function addFileToAthlete(file: FormData) {
    return await fetchFileAdd(file);
}

async function fetchFileAdd(file: FormData): Promise<string | null> {
    return fetch("./file", {
        method: "post",
        body: file
    })
        .then(response => response.json())
        .then((response: any) => {
            if (response.error) {
                console.log("Looks like there was a problem. Status Code: " + response.status);
                return null;
            } else {
                return response.data.filePath;
            }
        })
        .catch(function(err: Error) {
            console.log("Fetch Error", err);
            return null;
        });
}

export function fetchAthleteFile(athleteId: string, file: string) {
    let params: any = {
        userId: athleteId,
        key: file
    };
    let query = Object.keys(params)
        .map((k: any) => encodeURIComponent(k) + "=" + encodeURIComponent(params[k]))
        .join("&");

    fetch("./file?" + query)
        .then(async function(response: any) {
            if (response.status !== 200) {
                console.log("Looks like there was a problem. Status Code: " + response.status);
            } else {
                const blob = await response.blob();
                download(blob, file);
            }
        })
        .catch(function(err: Error) {
            console.log("Fetch Error", err);
        });
}

export async function deleteAthleteFile(athleteId: string, file: string): Promise<string | null> {
    let params: any = {
        userId: athleteId,
        key: file
    };
    let query = Object.keys(params)
        .map((k: any) => encodeURIComponent(k) + "=" + encodeURIComponent(params[k]))
        .join("&");

    return fetch("./file?" + query, { method: "delete" })
        .then(function(response: any) {
            if (response.status !== 200) {
                console.log("Looks like there was a problem. Status Code: " + response.status);
                return null;
            } else {
                return "Success";
            }
        })
        .catch(function(err: Error) {
            console.log("Fetch Error", err);
            return null;
        });
}

const transformAthleteProfileToJSON = (
    athlete: AthleteProfile,
    createdBy: string,
    hasId: boolean
) => {
    return JSON.stringify({
        id: hasId ? athlete.id : undefined,
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
            email: athlete.emergencyContact.email,
            phone: athlete.emergencyContact.phone
        },
        injuries: athlete.injuries.map(i => i.id),
        teams: [],
        notes: []
    });
};
