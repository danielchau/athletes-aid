import * as React from 'react'
import InjuryDialog from '../src/components/InjuryDialog'
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

it('InjuryDialog renders correctly', () => {
  const tree = renderer.create(<InjuryDialog injury={mockInjury} selectedTeam={mockTeam} currentUser={mockUser} />).toJSON()
  expect(tree).toMatchSnapshot()
})

/*
InjuryDialogProps {
    injury: Injury;
    injuryOpen: boolean;
    handleInjuryClose: any;
    getAthleteInjuries: (startDate: Date, endDate: Date, team: string) => AthleteInjuries;
    startingDate: Date;
    endingDate: Date;
    selectedTeam: Team;
    currentUser: User;
    getCurrentRoster: (athleteIds: string[]) => Promise<Athlete[]>;
}
*/