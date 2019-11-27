import { giveMeFive } from '../src/JestTest'

test('generateAttributeIds', () => {
  expect(giveMeFive()).toBe(5)
})