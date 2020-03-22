import * as React from 'react'
import BodyVisualization from '../src/components/BodyVisualization'
import renderer from 'react-test-renderer'

let date: Date = new Date("2019-01-01");
    
const mockInjuryNote = {
    createdBy: "Test createdBy",
    createdOn: date,
    content: "Test content"
}

const mockInjuries = [{
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
}]

it('BodyVisualization renders correctly', () => {
  const tree = renderer.create(<BodyVisualization injuries={mockInjuries} />).toJSON()
  expect(tree).toMatchSnapshot()
})
