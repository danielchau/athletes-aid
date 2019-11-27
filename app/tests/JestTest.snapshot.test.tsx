import * as React from 'react'
import Button from '../src/JestTest'
import renderer from 'react-test-renderer'

it('Jest Test correctly renders', () => {
  const tree = renderer.create(<Button buttonText="Some Text" />).toJSON()
  expect(tree).toMatchSnapshot()
})