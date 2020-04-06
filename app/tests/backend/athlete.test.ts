import * as React from 'react'
import { mocked } from 'ts-jest/utils';
import { postAthlete, getAthlete, updateAthlete, postFile, getFile, deleteFile } from '../../server/models/athlete'
import mapper from "../../server/models/mapper";
import { S3Client } from "../../server/models/s3client";
import * as fs from "fs";

let date: Date = new Date("2019-01-01");

const mockEmergencyContact = {
    id: "Test id",
    name: "Test name",
    cellPhone: "Test cellPhone",
    homePhone: "Test homePhone",
    email: "Test email"
}

const mockAthlete = {
    id: "Test id",
    createdAt: date,
    createdBy: "Test createdBy",
    firstName: "Test firstName",
    lastName: "Test lastName",
    password: "Test password",
    birthDate: date,
    yearInSchool: 1,
    gender: "Test gender",
    weight: 1,
    height: 1,
    email: "Test email",
    cellPhone: "Test cellPhone",
    homePhone: "Test homePhone",
    address: "Test address",
    emailNotifications: true,
    textNotifications: true,
    healthPlan: "Test healthPlan",
    memberId: 1,
    groupNumber: 1,
    provincialHealthCardnumber: "Test provincialHealthCardnumber",
    studentNumber: "Test studentNumber",
    province: "Test province",
    primaryPhysician: "Test primaryPhysician",
    emergencyContact: mockEmergencyContact,
    teams: ["Test teams"]
}

// Mock functions
jest.mock('../../server/models/mapper');
jest.mock('../../server/models/s3client');
jest.mock('fs');
mapper.put.mockResolvedValue({id: "Test Put"});
mapper.get.mockResolvedValue(mockAthlete);
mapper.update.mockResolvedValue(mockAthlete);
mapper.scan.mockResolvedValue(mockAthlete);
S3Client.mockImplementation(() => {
    return {
        put: () => {
            return { ETag: "Test ETag" };
        },
        get: () => {
            return { Body: "Test Body" };
        },
    };
});
const now = Date.now();
Date.now = jest.fn().mockReturnValue("Test Datenow");
fs.writeFileSync.mockReturnValue("Test fileLocation");


describe('athlete test', () => {
    test('postAthlete', async () => {        
        const athleteID = await postAthlete(mockAthlete);
        
        expect(athleteID).toBeDefined();
        expect(athleteID).toBe('Test Put');
    });
    
    test('getAthlete', async () => {        
        const athlete = await getAthlete("Test id");
        
        expect(athlete).toBeDefined();
        expect(athlete.id).toBe("Test id");
        expect(athlete.createdBy).toBe("Test createdBy");
    });
    
    test('updateAthlete', async () => {
        const athlete = await updateAthlete(mockAthlete);
        
        expect(athlete).toBeDefined();
        expect(athlete.id).toBe("Test id");
        expect(athlete.createdBy).toBe("Test createdBy");
    });
    
    test('postFile', async () => {
        const file = {
            originalname: "Test originalname"
        }
        const userId = "Test userId";
        const postedFile = await postFile(file, userId);
        
        const fileReturn = {
            tag: "Test ETag",
            filePath: "Test userId/Test Datenow-Test originalname"
        };
        
        expect(postedFile).toBeDefined();
        expect(postedFile).toStrictEqual(fileReturn);
    });
    
    test('getFile', async () => {
        const key = "Test key";
        const userId = "Test userId";
        const gotFile = await getFile(key, userId);
        
        expect(gotFile).toBeDefined();
        expect(gotFile).toEqual(expect.stringContaining("Test key"));
    });
});
