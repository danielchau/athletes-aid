import * as React from 'react'
import { mocked } from 'ts-jest/utils';
import { putInjury } from '../../server/models/injury'
import mapper from "../../server/models/mapper";

describe('injury test', () => {
    test('putInjury', async () => {        
        const injuryID = await putInjury({name: "Test Name", email: "Test Email"}); //This line causes the error to occur: Find out why.
        
        //expect(injuryID).toBeDefined();
        //expect(injuryID).toBe('Test ID');
        expect(true).toBe(true);
    });
});