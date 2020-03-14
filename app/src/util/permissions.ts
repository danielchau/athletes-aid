/**
 * UserPermissions is used to determine the user's role inside the app and what they can view.
 */
export interface UserPermissions {
    label: string;
    pages: PagePermissions;
    canSeeSearchBar: boolean;
    canEditOtherProfiles: boolean;
    canSeeInjuryDetails: boolean;
}

/**
 * PagePermissions controls which pages a user can see.
 */
interface PagePermissions {
    profiles: boolean;
    roster: boolean;
    logging: boolean;
    injuries: boolean;
    rosterManagement: boolean;
    userManagement: boolean;
}

/**
 * Admins have full permissions.
 */
export const AdminPermissions: UserPermissions = {
    label: "Administrator",
    pages: {
        profiles: true,
        roster: true,
        logging: true,
        injuries: true,
        rosterManagement: true,
        userManagement: true
    },
    canSeeSearchBar: true,
    canEditOtherProfiles: true,
    canSeeInjuryDetails: true
};

/**
 * Trainers can only see relevant teems but have access to all pages.
 */
export const TrainerPermissions: UserPermissions = {
    label: "Trainer",
    pages: {
        profiles: true,
        roster: true,
        logging: true,
        injuries: true,
        rosterManagement: false,
        userManagement: false
    },
    canSeeSearchBar: true,
    canEditOtherProfiles: false,
    canSeeInjuryDetails: true
};

/**
 * Athletes can only see their own profile and log their own injuries.
 */
export const AthletePermissions: UserPermissions = {
    label: "Athlete",
    pages: {
        profiles: false,
        roster: false,
        logging: true,
        injuries: false,
        rosterManagement: false,
        userManagement: false
    },
    canSeeSearchBar: false,
    canEditOtherProfiles: false,
    canSeeInjuryDetails: true
};

/**
 * Coaches can only see surface level information on their roster.
 */
export const CoachPermissions: UserPermissions = {
    label: "Coach",
    pages: {
        profiles: true,
        roster: true,
        logging: false,
        injuries: false,
        rosterManagement: false,
        userManagement: false
    },
    canSeeSearchBar: true,
    canEditOtherProfiles: false,
    canSeeInjuryDetails: false
};
