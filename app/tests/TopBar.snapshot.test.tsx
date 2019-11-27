import * as React from 'react'
import TopBar from '../src/components/TopBar'
import renderer from 'react-test-renderer'

it('InjuryDialog renders correctly', () => {
  const tree = renderer.create(<TopBar state={open} handleDrawerOpen={true} />).toJSON()
  expect(tree).toMatchSnapshot()
})