import * as React from 'react'
import FetchingScreen from '../src/components/FetchingScreen'
import renderer from 'react-test-renderer'

it('FetchingScreen renders correctly', () => {
  const tree = renderer.create(<FetchingScreen />).toJSON()
  expect(tree).toMatchSnapshot()
})
