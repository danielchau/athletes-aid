import * as React from 'react'
import AddAthleteTable from '../src/components/AddAthleteTable'
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

const mockAthleteProfiles = [{
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
}]

const mockAthletes = [{
    id: "Test id",
    name: "Test name",
    injuries: [mockInjury]
}]

const mockListAthletes = [{
    id: "Test id",
    name: "Test name",
    birthdate: null
}]

const mockUser = {
    athleteProfile: {},
    permissions: {}
}

it('AddAthleteTable renders correctly', () => {
  const tree = renderer.create(<AddAthleteTable athletes={mockAthleteProfiles} rosterAthletes={mockAthletes} allAthletes={mockListAthletes} currentUser={mockUser} />).toJSON()
  expect(tree).toMatchSnapshot()
})
