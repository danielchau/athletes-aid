import * as React from 'react'
import RosterManagementPage from '../src/components/RosterManagementPage'
import renderer from 'react-test-renderer'

let date: Date = new Date("2019-01-01");

const mockInjuryNote = {
    createdBy: "Test createdBy",
    createdOn: date,
    content: "Test content"
}

const mockEmergencyContact = {
    id: "Test id",
    name: "Test name",
    cellPhone: "Test cellPhone",
    homePhone: "Test homePhone",
    email: "Test email"
}

const mockInjury = {
    id: "Test id",
    active: true,
    createdOn: date,
    createdBy: "Test createdBy",
    teamName: "Test teamName",
    athleteName: "Test athleteName",
    injuryDate: date,
    isSportsRelated: true,
    eventType: "Test eventType",
    position: "Test position",
    sideOfBody: "Test sideOfBody",
    locationOnBody: "Test locationOnBody",
    injuryType: "Test injuryType",
    severity: 1,
    status: "Test status",
    mechanism: "Test mechanism",
    injuryDescription: "Test injuryDescription",
    otherNotes: [mockInjuryNote]
}

const mockAthleteProfile = {
    id: "Test id",
    profilePicture: "Test profilePicture",
    name: "Test name",
    birthdate: "Test birthdate",
    schoolYear: 1,
    gender: "Test gender",
    weight: 1,
    height: 1,
    email: "Test email",
    cellPhone: "Test cellPhone",
    homePhone: "Test homePhone",
    healthCardNumber: "Test healthCardNumber",
    emergencyContact: mockEmergencyContact,
    files: ["Test files"],
    injuries: [mockInjury]
}

const mockPagePermissions = {
    profiles: true,
    roster: true,
    logging: true,
    injuries: true,
    rosterManagement: true
}


const mockUserPermissions = {
    label: "Test label",
    pages: mockPagePermissions,
    canSeeSearchBar: true,
    canEditOtherProfiles: true,
    canSeeInjuryDetails: true
}

const mockUser = {
    athleteProfile: mockAthleteProfile,
    permissions: mockUserPermissions
}

const mockTeams = [{
    id: "Test id",
    name: "Test name",
    season: "Test season",
    athleteIds: ["Test athleteIds 1", "Test athleteIds 2"]
}]

it('RosterManagementPage renders correctly', () => {
  const tree = renderer.create(<RosterManagementPage state={false} teams={mockTeams} currentUser={mockUser} />).toJSON()
  expect(tree).toMatchSnapshot()
})