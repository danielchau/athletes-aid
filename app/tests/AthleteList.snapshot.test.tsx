import * as React from 'react'
import AthleteList from '../src/components/AthleteList'
import renderer from 'react-test-renderer'

const mockListAthletes = [{
    id: "Test id",
    name: "Test name",
    birthdate: null
}]

let testSet = new Set();

it('AthleteList renders correctly', () => {
  const tree = renderer.create(<AthleteList athletes={mockListAthletes} checked={testSet} />).toJSON()
  expect(tree).toMatchSnapshot()
})
