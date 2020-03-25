import * as React from 'react'
import InjuriesDataTable from '../src/components/InjuriesDataTable'

test('desc a < b', () => {
    const a = [0, 0]
    const b = [1, 0]
    expect(InjuriesDataTable.desc(a, b, 0)).toBe(1)
})

test('desc a > b', () => {
    const a = [1, 0]
    const b = [0, 0]
    expect(InjuriesDataTable.desc(a, b, 0)).toBe(-1)
})

test('desc a = b', () => {
    const a = [0, 0]
    const b = [0, 0]
    expect(InjuriesDataTable.desc(a, b, 0)).toBe(0)
})