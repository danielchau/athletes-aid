export interface UserPermissions {
    label: string;
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
    label: "Administrator",
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
    label: "Trainer",
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
    label: "Athlete",
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
    label: "Coach",
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
