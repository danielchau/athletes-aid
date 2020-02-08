import { HeadCell } from "../util/types";

/**
 * Page names
 */
export const profilePageName: string = "My Profile";
export const rosterPageName: string = "Roster";
export const injuryLoggingPageName: string = "Injury Logging";
export const injuriesPageName: string = "Injuries";
export const rosterManagementPageName: string = "Roster Management";

/**
 * URL Redirect paths for navigation
 */
export const myProfilePath: string = "/myprofile";
export const profilePath: string = "/profile";
export const rosterPath: string = "/roster";
export const injuryLoggingPath: string = "/logging";
export const injuriesPath: string = "/";
export const rosterManagementPath: string = "/rostermanagement";

/**
 * Drawer width of the navigation panel
 */
export const drawerWidth: number = 240;

/**
 * Constants used for prepopulated dropdowns when logging injuries.
 */
export const eventTypes: string[] = ["Game", "Practice", "Personal"];
export const sidesOfBody: string[] = ["Bilateral", "Left", "Midline", "Right", "Not On Body"];
export const bodyLocations: string[] = [
    "Abdominals",
    "Ankle",
    "Back",
    "Biceps",
    "Cervical",
    "Chest",
    "Elbow",
    "Foot",
    "Forearms",
    "Hamstring/Thigh",
    "Hand",
    "Head/Face",
    "Hip/Pelvis",
    "Knee",
    "Lower Leg/Calf",
    "Neck/Spine",
    "Quadriceps",
    "Shin",
    "Shoulder/Proximal Humerous",
    "Trapezius",
    "Triceps",
    "Wrist",
    "Other"
];
export const injuryTypes: string[] = [
    "Concussion",
    "Conditions",
    "Contusion",
    "Dislocation",
    "Fracture",
    "Illness",
    "Laceration",
    "Overuse",
    "Sprain",
    "Strain",
    "Subluxation",
    "Other"
];
export const severities: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
export const playerStatuses: string[] = ["Out", "Mod", "RTP"];
export const mechanismsOfInjury: string[] = [
    "Direct contact with another athlete",
    "Direct contact with field equipment",
    "Direct contact with playing surface",
    "Illness",
    "Indirect contact",
    "Non-contact",
    "Other",
    "Overuse",
    "Unknown"
];

/**
 * Used for the cell headers in the data table
 */
export const headCells: HeadCell[] = [
    {
        id: "athleteName",
        numeric: false,
        disablePadding: true,
        label: "Athlete Name"
    },
    {
        id: "injuryDate",
        numeric: true,
        disablePadding: false,
        label: "Injury Date"
    },
    {
        id: "locationOnBody",
        numeric: true,
        disablePadding: false,
        label: "Body Location"
    },
    {
        id: "injuryType",
        numeric: true,
        disablePadding: false,
        label: "Injury Type"
    },
    {
        id: "severity",
        numeric: true,
        disablePadding: false,
        label: "Severity"
    },
    {
        id: "status",
        numeric: true,
        disablePadding: false,
        label: "Status"
    }
];
