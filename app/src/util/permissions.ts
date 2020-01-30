export interface UserPermissions {
    pages: PagePermissions;
    canSeeSearchBar: boolean;
    canEditOtherProfiles: boolean;
    canSeeInjuryDetails: boolean;
}

interface PagePermissions {
    profiles: boolean;
    roster: boolean;
    logging: boolean;
    injuries: boolean;
    rosterManagement: boolean;
}

export const AdminPermissions: UserPermissions = {
    pages: {
        profiles: true,
        roster: true,
        logging: true,
        injuries: true,
        rosterManagement: true
    },
    canSeeSearchBar: true,
    canEditOtherProfiles: true,
    canSeeInjuryDetails: true
};

export const TrainerPermissions: UserPermissions = {
    pages: {
        profiles: true,
        roster: true,
        logging: true,
        injuries: true,
        rosterManagement: false
    },
    canSeeSearchBar: true,
    canEditOtherProfiles: false,
    canSeeInjuryDetails: true
};

export const AthletePermissions: UserPermissions = {
    pages: {
        profiles: false,
        roster: false,
        logging: true,
        injuries: false,
        rosterManagement: false
    },
    canSeeSearchBar: false,
    canEditOtherProfiles: false,
    canSeeInjuryDetails: true
};

export const CoachPermissions: UserPermissions = {
    pages: {
        profiles: true,
        roster: true,
        logging: false,
        injuries: false,
        rosterManagement: false
    },
    canSeeSearchBar: true,
    canEditOtherProfiles: false,
    canSeeInjuryDetails: false
};
