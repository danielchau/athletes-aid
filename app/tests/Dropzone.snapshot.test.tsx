import * as React from 'react'
import Dropzone from '../src/components/Dropzone'
import renderer from 'react-test-renderer'

it('Dropzone renders correctly', () => {
  const tree = renderer.create(<Dropzone setNewAthletes={false} />).toJSON()
  expect(tree).toMatchSnapshot()
})
