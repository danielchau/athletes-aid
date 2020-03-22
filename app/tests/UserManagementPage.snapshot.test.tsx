import * as React from 'react'
import UserManagementPage from '../src/components/UserManagementPage'
import renderer from 'react-test-renderer'

const mockUser = {
    athleteProfile: {},
    permissions: {}
}
it('UserManagementPage renders correctly', () => {
  const tree = renderer.create(<UserManagementPage user={mockUser} />).toJSON()
  expect(tree).toMatchSnapshot()
})