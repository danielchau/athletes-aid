import { Injury } from "./types";
import { AdminPermissions, TrainerPermissions, CoachPermissions } from "./permissions";

/**
 * Mock data for the User until we get authentication setup.
 */
export const mockUser = {
    athleteProfile: {
        id: "1",
        profilePicture:
            "https://scontent-sea1-1.xx.fbcdn.net/v/t31.0-8/23270537_1754541497892311_2239260117644537268_o.jpg?_nc_cat=110&_nc_ohc=KpHOGrkCz2UAQnatg2Mri2JdHukWWzl7-6G2M6JdvFxYxACuiM8n8bjZQ&_nc_ht=scontent-sea1-1.xx&oh=e7f52a779c18c2bf009eabaf1fd04482&oe=5E9F4B82",
        name: "Daniel Chau",
        birthdate: new Date().toDateString(),
        schoolYear: 4,
        gender: "Male",
        weight: 50,
        height: 180,
        email: "daniel_chau@live.com",
        cellPhone: "647-960-9029",
        homePhone: "905-403-8062",
        healthCardNumber: "XXXX000XX0000",
        emergencyContact: {
            id: "2",
            name: "Mark Number",
            cellPhone: "647-960-9029",
            homePhone: "905-403-8062",
            email: "mark_number@live.com"
        },
        files: [] as string[],
        injuries: [] as Injury[]
    },
    permissions: AdminPermissions
};
