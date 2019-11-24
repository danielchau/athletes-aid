import * as React from 'react'
import InjuriesPage from '../src/components/InjuriesPage'
import renderer from 'react-test-renderer'
import { AthleteInjuries, Injury } from "../src/util/types";

let date: Date = new Date("2019-01-16");  
const InjuriesProps = {
    athleteInjuries: AthleteInjuries,
    getAthleteInjuries: (
        startDate: date,
        endDate: date,
        team: "Team String"
    ) => AthleteInjuries,
    startingDate: date,
    endingDate: date,
    setStartingDate: function (date: Date) {
        this.startingDate = date;
    },
    setEndingDate: function (date: Date) {
        this.endingDate = date;
    }
}

it('renders correctly', () => {
  const tree = renderer.create(<InjuriesPage props="InjuriesProps"/>).toJSON()
  expect(tree).toMatchSnapshot()
})