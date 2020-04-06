import * as React from 'react'
import { mocked } from 'ts-jest/utils';
import { putUser, getUser, createUniqueUser } from '../../server/models/user'
import mapper from "../../server/models/mapper";

jest.mock('../../server/models/mapper');
mapper.put.mockResolvedValue({name: "Test Name", email: "Test Email", userType: "Test userType", id: "Test ID"});
mapper.query.mockResolvedValue({name: "Test Name", email: "Test Email", userType: "Test userType", id: "Test ID"});

describe('user test', () => {
    test('putUser', async () => {        
        const personID = await putUser({name: "Test Name", email: "Test Email", userType: "Test userType"});
        
        expect(personID).toBeDefined();
        expect(personID).toBe('Test ID');
    });
    
    /*
    test('getUser', async () => {
        const person = await getUser("Test Email");
        
        expect(person).toBeDefined();
    });
    
    test('createUniqueUser', async () => {
        const personID = await createUniqueUser({name: "Test Name", email: "Test Email", userType: "Test userType"});
        
        expect(personID).toBeDefined();
        expect(personID).toBe('Test ID');
    });
    */
});
