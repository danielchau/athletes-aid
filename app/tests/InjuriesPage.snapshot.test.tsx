import * as React from 'react'
import InjuriesPage from '../src/components/InjuriesPage'
import renderer from 'react-test-renderer'

let date: Date = new Date("2019-01-01");
const mockAthleteInjuries = {
    injuries: [{
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
        note: {
            createdBy: "Test createdBy",
            createdOn: date,
            content: "Test content"
        },
        otherNotes: [{
            createdBy: "Test createdBy",
            createdOn: date,
            content: "Test content"
        }]
    }]
}

it('InjuriesPage renders correctly', () => {
  const tree = renderer.create(<InjuriesPage athleteInjuries={mockAthleteInjuries} startingDate={date} endingDate={date}/>).toJSON()
  expect(tree).toMatchSnapshot()
})