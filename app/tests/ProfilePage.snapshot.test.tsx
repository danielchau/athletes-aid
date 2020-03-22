import * as React from 'react'
import ProfilePage from '../src/components/ProfilePage'
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

const mockAthlete = {
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
    healthCardNumber: 1,
    studentNumber: "Test studentNumber",
    emergencyContact: mockEmergencyContact,
    files: ["Test files"],
    injuries: [mockInjury]
}

const mockUser = {
    athleteProfile: {},
    permissions: {}
}

const mockTeam = {
    id: "Test id",
    name: "Test name",
    season: "Test season",
    athleteIds: ["Test athleteId1", "Test athleteId2"]
}

it('ProfilePage renders correctly', () => {
  const tree = renderer.create(<ProfilePage state={false} currentAthlete={mockAthlete} currentUser={mockUser} canEdit={false} startingDate="2019-01-01" endingDate="2019-01-01" selectedTeam={mockTeam} />).toJSON()
  expect(tree).toMatchSnapshot()
})

