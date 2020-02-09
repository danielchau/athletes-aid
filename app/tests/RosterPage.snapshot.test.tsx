import * as React from 'react'
import RosterPage from '../src/components/RosterPage'
import renderer from 'react-test-renderer'

let date: Date = new Date("2019-01-01");

const mockTeam = {
    id: "Test id",
    name: "Test name",
    season: "Test season",
    athleteIds: ["Test athleteIds 1", "Test athleteIds 2"]
}

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

const mockAthlete = {
    id: "Test id",
    name: "Test name",
    injuries: [mockInjury]
}

it('RosterPage renders correctly', () => {
  const tree = renderer.create(<RosterPage selectedTeam={mockTeam} currentRoster={mockAthlete} />).toJSON()
  expect(tree).toMatchSnapshot()
})