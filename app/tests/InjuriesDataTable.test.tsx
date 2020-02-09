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

//THIS IS WHAT I NEED TO CONTINUE WORKING ON.
test('stableSort empty array', () => {
  const array = [1, 1, 1]
  const cmp = function (a: T, b: T) {
    return 1;
  }
  
  const result = InjuriesDataTable.stableSort(array, cmp)
  
  //expect(result).toBe([1, 1, 1])
  expect(true).toBe(true)
})

test('getSorting', () => {

  //getSorting(order, orderBy)
  
  expect(true).toBe(true)
})




/*
function desc<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function stableSort<T>(array: T[], cmp: (a: T, b: T) => number) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
        const order = cmp(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
}

function getSorting<K extends keyof any>(
    order: Order,
    orderBy: keyof Injury
): (a: Injury, b: Injury) => number {
    return order === "desc" ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}
*/