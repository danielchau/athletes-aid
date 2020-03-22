import * as React from 'react'
import NavigationPanel from '../src/components/NavigationPanel'
import renderer from 'react-test-renderer'
import { BrowserRouter, Route, Link } from "react-router-dom";
import EnzymeToJson from 'enzyme-to-json';
import { configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';

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

const mockTeams = [{
    id: "Test id",
    name: "Test name",
    season: "Test season",
    athleteIds: ["Test athleteId1", "Test athleteId2"]
}]

const mockUser = {
    athleteProfile: {},
    permissions: {
        pages: {
            roster: "Test roster"
        }
    }
}

const mockLocation = {
    pathname: "Test pathname"
}

configure({adapter: new Adapter()});

it('NavigationPanel renders correctly', () => {
  const subject = mount(<BrowserRouter><NavigationPanel state={false} selectedTeam={mockTeam} teams={mockTeams} currentUser={mockUser} location={"test"}/></BrowserRouter>);
  expect(EnzymeToJson(subject)).toMatchSnapshot();
})