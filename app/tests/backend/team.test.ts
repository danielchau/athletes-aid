import * as React from 'react'
import { mocked } from 'ts-jest/utils';
import { putTeam, getTeam, addAthlete, updateTeam } from '../../server/models/team'
import mapper from "../../server/models/mapper";

let date: Date = new Date("2019-01-01");

const mockTeam = {
    id: "Test id",
    name: "Test name",
    season: "Test season",
    createdBy: "Test createdBy",
    createdAt: date,
    athletes: ["Test athletes"]
}

jest.mock('../../server/models/mapper');
mapper.put.mockResolvedValue({name: "Test Name", email: "Test Email", userType: "Test userType", id: "Test ID"});
mapper.get.mockResolvedValue(mockTeam);
mapper.update.mockResolvedValue(mockTeam);

describe('team test', () => {
    test('putTeam', async () => {        
        const teamID = await putTeam({name: "Test Name", email: "Test Email"});
        
        expect(teamID).toBeDefined();
        expect(teamID).toBe('Test ID');
    });
    
    test('getTeam', async () => {        
        const team = await getTeam("Test teamId");
        
        expect(team).toBeDefined();
        expect(team.id).toBe('Test id');
    });
    
    test('addAthlete', async () => {        
        const teamID = await addAthlete("Test id", "Test athleteId");
        
        expect(teamID).toBeDefined();
        expect(teamID).toBe('Test id');
    });
    
    test('updateTeam', async () => {        
        const teamID = await updateTeam("Test id", ["Test athleteIds"], "Test season", "Test name");
        
        expect(teamID).toBeDefined();
        expect(teamID).toBe('Test id');
    });
});
