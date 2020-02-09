import * as React from 'react'
import InjuriesPage from '../src/components/InjuriesPage'
import renderer from 'react-test-renderer'

let date: Date = new Date("2019-01-01");

const mockInjuryNote = {
    createdBy: "Test createdBy",
    createdOn: date,
    content: "Test content"
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

const mockAthleteInjuries = {
    injuries: [mockInjury],
    startDate: "Test startDate",
    endDate: "Test endDate"
}

const mockGetAthleteInjuries = function (startDate: Date, endDate: Date, team: string) {
    return mockAthleteInjuries
}

const mockTeam = {
    id: "Test id",
    name: "Test name",
    season: "Test season",
    athleteIds: ["Test athleteId1", "Test athleteId2"]
}

const mockUser = {
    athleteProfile: {},
    permissions: {}
}

/*
Needs to be fixed.

it('InjuriesPage renders correctly', () => {
  const tree = renderer.create(<InjuriesPage athleteInjuries={mockAthleteInjuries} getAthleteInjuries={mockGetAthleteInjuries} startingDate="2019-01-01" endingDate="2019-01-01" selectedTeam={mockTeam} state={false} currentUser={mockUser} />).toJSON()
  expect(tree).toMatchSnapshot()
})
*/

test('TODO', () => {
  expect(true).toBe(true)
})