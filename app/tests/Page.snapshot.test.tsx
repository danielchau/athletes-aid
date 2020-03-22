import * as React from 'react'
import Page from '../src/components/Page'
import renderer from 'react-test-renderer'

it('Page renders correctly', () => {
  const subject = renderer.create(<Page />);
  expect(tree).toMatchSnapshot()
})
