import * as React from 'react'
import InjuryLoggingPage from '../src/components/InjuryLoggingPage'
import renderer from 'react-test-renderer'

const mockTeam = {
    name: "Test name",
    athletes: [{
        id: "Test id",
        name: "Test name"
    }]
}

it('InjuryDialog renders correctly', () => {
  const tree = renderer.create(<InjuryLoggingPage selectedTeam={mockTeam} existingInjury={null} callbackUponFinishing={true} />).toJSON()
  expect(tree).toMatchSnapshot()
})