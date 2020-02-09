import * as React from 'react'
import InjuriesPage from '../src/components/InjuriesPage'

test('getAverageSeverity empty injury array', () => {
    const mockInjury = []
    expect(InjuriesPage.getAverageSeverity(mockInjury)).toBe("0")
})

test('getAverageSeverity sum of severity (1) divided by length (1)', () => {
    let date: Date = new Date("2019-01-01");
    
    const mockInjuryNote = {
        createdBy: "Test createdBy",
        createdOn: date,
        content: "Test content"
    }
    
    const mockInjury = [{
        id: "Test id",
        active: true,
        createdOn: date,
        createdBy: "Test createdBy",
        teamName: "Test teamName",
        athleteName: "Test athleteName",
        injuryDate: date,
        isSportsRelated: true,
        eventType: "Test eventType",
        position: "Test position",
        sideOfBody: "Test sideOfBody",
        locationOnBody: "Test locationOnBody",
        injuryType: "Test injuryType",
        severity: 1,
        status: "Test status",
        mechanism: "Test mechanism",
        injuryDescription: "Test injuryDescription",
        otherNotes: [mockInjuryNote]
    }]
    
    expect(InjuriesPage.getAverageSeverity(mockInjury)).toBe("1.0")
})

test('getAverageSeverity sum of severity (2) divided by length (1)', () => {
    let date: Date = new Date("2019-01-01");
    
    const mockInjuryNote = {
        createdBy: "Test createdBy",
        createdOn: date,
        content: "Test content"
    }
    
    const mockInjury = [{
        id: "Test id",
        active: true,
        createdOn: date,
        createdBy: "Test createdBy",
        teamName: "Test teamName",
        athleteName: "Test athleteName",
        injuryDate: date,
        isSportsRelated: true,
        eventType: "Test eventType",
        position: "Test position",
        sideOfBody: "Test sideOfBody",
        locationOnBody: "Test locationOnBody",
        injuryType: "Test injuryType",
        severity: 2,
        status: "Test status",
        mechanism: "Test mechanism",
        injuryDescription: "Test injuryDescription",
        otherNotes: [mockInjuryNote]
    }]
    
    expect(InjuriesPage.getAverageSeverity(mockInjury)).toBe("2.0")
})

test('getAverageSeverity sum of severity (4) divided by length (2)', () => {
    let date: Date = new Date("2019-01-01");
    
    const mockInjuryNote = {
        createdBy: "Test createdBy",
        createdOn: date,
        content: "Test content"
    }
    
    const mockInjury = [{
        id: "Test id",
        active: true,
        createdOn: date,
        createdBy: "Test createdBy",
        teamName: "Test teamName",
        athleteName: "Test athleteName",
        injuryDate: date,
        isSportsRelated: true,
        eventType: "Test eventType",
        position: "Test position",
        sideOfBody: "Test sideOfBody",
        locationOnBody: "Test locationOnBody",
        injuryType: "Test injuryType",
        severity: 2,
        status: "Test status",
        mechanism: "Test mechanism",
        injuryDescription: "Test injuryDescription",
        otherNotes: [mockInjuryNote]
    }, {
        id: "Test id",
        active: true,
        createdOn: date,
        createdBy: "Test createdBy",
        teamName: "Test teamName",
        athleteName: "Test athleteName",
        injuryDate: date,
        isSportsRelated: true,
        eventType: "Test eventType",
        position: "Test position",
        sideOfBody: "Test sideOfBody",
        locationOnBody: "Test locationOnBody",
        injuryType: "Test injuryType",
        severity: 2,
        status: "Test status",
        mechanism: "Test mechanism",
        injuryDescription: "Test injuryDescription",
        otherNotes: [mockInjuryNote]
    }]
    
    expect(InjuriesPage.getAverageSeverity(mockInjury)).toBe("2.0")
})

test('getAverageSeverity sum of severity (1) divided by length (2)', () => {
    let date: Date = new Date("2019-01-01");
    
    const mockInjuryNote = {
        createdBy: "Test createdBy",
        createdOn: date,
        content: "Test content"
    }
    
    const mockInjury = [{
        id: "Test id",
        active: true,
        createdOn: date,
        createdBy: "Test createdBy",
        teamName: "Test teamName",
        athleteName: "Test athleteName",
        injuryDate: date,
        isSportsRelated: true,
        eventType: "Test eventType",
        position: "Test position",
        sideOfBody: "Test sideOfBody",
        locationOnBody: "Test locationOnBody",
        injuryType: "Test injuryType",
        severity: 0,
        status: "Test status",
        mechanism: "Test mechanism",
        injuryDescription: "Test injuryDescription",
        otherNotes: [mockInjuryNote]
    }, {
        id: "Test id",
        active: true,
        createdOn: date,
        createdBy: "Test createdBy",
        teamName: "Test teamName",
        athleteName: "Test athleteName",
        injuryDate: date,
        isSportsRelated: true,
        eventType: "Test eventType",
        position: "Test position",
        sideOfBody: "Test sideOfBody",
        locationOnBody: "Test locationOnBody",
        injuryType: "Test injuryType",
        severity: 1,
        status: "Test status",
        mechanism: "Test mechanism",
        injuryDescription: "Test injuryDescription",
        otherNotes: [mockInjuryNote]
    }]
    
    expect(InjuriesPage.getAverageSeverity(mockInjury)).toBe("0.5")
})

test('getTotalPlayersOut no athletes', () => {
    let date: Date = new Date("2019-01-01");
    
    const mockInjuryNote = {
        createdBy: "Test createdBy",
        createdOn: date,
        content: "Test content"
    }
    
    const mockInjury = []
    
    expect(InjuriesPage.getTotalPlayersOut(mockInjury)).toBe(0)
})

test('getTotalPlayersOut 1 athlete with status In', () => {
    let date: Date = new Date("2019-01-01");
    
    const mockInjuryNote = {
        createdBy: "Test createdBy",
        createdOn: date,
        content: "Test content"
    }
    
    const mockInjury = [{
        id: "Test id",
        active: true,
        createdOn: date,
        createdBy: "Test createdBy",
        teamName: "Test teamName",
        athleteName: "Test athleteName",
        injuryDate: date,
        isSportsRelated: true,
        eventType: "Test eventType",
        position: "Test position",
        sideOfBody: "Test sideOfBody",
        locationOnBody: "Test locationOnBody",
        injuryType: "Test injuryType",
        severity: 1,
        status: "In",
        mechanism: "Test mechanism",
        injuryDescription: "Test injuryDescription",
        otherNotes: [mockInjuryNote]
    }]
    
    expect(InjuriesPage.getTotalPlayersOut(mockInjury)).toBe(0)
})

test('getTotalPlayersOut 1 athlete with status Out', () => {
    let date: Date = new Date("2019-01-01");
    
    const mockInjuryNote = {
        createdBy: "Test createdBy",
        createdOn: date,
        content: "Test content"
    }
    
    const mockInjury = [{
        id: "Test id",
        active: true,
        createdOn: date,
        createdBy: "Test createdBy",
        teamName: "Test teamName",
        athleteName: "Test athleteName",
        injuryDate: date,
        isSportsRelated: true,
        eventType: "Test eventType",
        position: "Test position",
        sideOfBody: "Test sideOfBody",
        locationOnBody: "Test locationOnBody",
        injuryType: "Test injuryType",
        severity: 1,
        status: "Out",
        mechanism: "Test mechanism",
        injuryDescription: "Test injuryDescription",
        otherNotes: [mockInjuryNote]
    }]
    
    expect(InjuriesPage.getTotalPlayersOut(mockInjury)).toBe(1)
})

test('getTotalPlayersOut 2 athletes with different names both with status Out', () => {
    let date: Date = new Date("2019-01-01");
    
    const mockInjuryNote = {
        createdBy: "Test createdBy",
        createdOn: date,
        content: "Test content"
    }
    
    const mockInjury = [{
        id: "Test id",
        active: true,
        createdOn: date,
        createdBy: "Test createdBy",
        teamName: "Test teamName",
        athleteName: "Test athleteName",
        injuryDate: date,
        isSportsRelated: true,
        eventType: "Test eventType",
        position: "Test position",
        sideOfBody: "Test sideOfBody",
        locationOnBody: "Test locationOnBody",
        injuryType: "Test injuryType",
        severity: 1,
        status: "Out",
        mechanism: "Test mechanism",
        injuryDescription: "Test injuryDescription",
        otherNotes: [mockInjuryNote]
    }, {
        id: "Test id",
        active: true,
        createdOn: date,
        createdBy: "Test createdBy",
        teamName: "Test teamName",
        athleteName: "Test athleteName 2",
        injuryDate: date,
        isSportsRelated: true,
        eventType: "Test eventType",
        position: "Test position",
        sideOfBody: "Test sideOfBody",
        locationOnBody: "Test locationOnBody",
        injuryType: "Test injuryType",
        severity: 1,
        status: "Out",
        mechanism: "Test mechanism",
        injuryDescription: "Test injuryDescription",
        otherNotes: [mockInjuryNote]
    }]
    
    expect(InjuriesPage.getTotalPlayersOut(mockInjury)).toBe(2)
})

test('getTotalPlayersOut 2 athletes with different names 1 with status In 1 with status Out', () => {
    let date: Date = new Date("2019-01-01");
    
    const mockInjuryNote = {
        createdBy: "Test createdBy",
        createdOn: date,
        content: "Test content"
    }
    
    const mockInjury = [{
        id: "Test id",
        active: true,
        createdOn: date,
        createdBy: "Test createdBy",
        teamName: "Test teamName",
        athleteName: "Test athleteName",
        injuryDate: date,
        isSportsRelated: true,
        eventType: "Test eventType",
        position: "Test position",
        sideOfBody: "Test sideOfBody",
        locationOnBody: "Test locationOnBody",
        injuryType: "Test injuryType",
        severity: 1,
        status: "In",
        mechanism: "Test mechanism",
        injuryDescription: "Test injuryDescription",
        otherNotes: [mockInjuryNote]
    }, {
        id: "Test id",
        active: true,
        createdOn: date,
        createdBy: "Test createdBy",
        teamName: "Test teamName",
        athleteName: "Test athleteName 2",
        injuryDate: date,
        isSportsRelated: true,
        eventType: "Test eventType",
        position: "Test position",
        sideOfBody: "Test sideOfBody",
        locationOnBody: "Test locationOnBody",
        injuryType: "Test injuryType",
        severity: 1,
        status: "Out",
        mechanism: "Test mechanism",
        injuryDescription: "Test injuryDescription",
        otherNotes: [mockInjuryNote]
    }]
    
    expect(InjuriesPage.getTotalPlayersOut(mockInjury)).toBe(1)
})

test('getTotalPlayersOut 2 athletes with the same name both with status Out', () => {
    let date: Date = new Date("2019-01-01");
    
    const mockInjuryNote = {
        createdBy: "Test createdBy",
        createdOn: date,
        content: "Test content"
    }
    
    const mockInjury = [{
        id: "Test id",
        active: true,
        createdOn: date,
        createdBy: "Test createdBy",
        teamName: "Test teamName",
        athleteName: "Test athleteName",
        injuryDate: date,
        isSportsRelated: true,
        eventType: "Test eventType",
        position: "Test position",
        sideOfBody: "Test sideOfBody",
        locationOnBody: "Test locationOnBody",
        injuryType: "Test injuryType",
        severity: 1,
        status: "Out",
        mechanism: "Test mechanism",
        injuryDescription: "Test injuryDescription",
        otherNotes: [mockInjuryNote]
    }, {
        id: "Test id",
        active: true,
        createdOn: date,
        createdBy: "Test createdBy",
        teamName: "Test teamName",
        athleteName: "Test athleteName",
        injuryDate: date,
        isSportsRelated: true,
        eventType: "Test eventType",
        position: "Test position",
        sideOfBody: "Test sideOfBody",
        locationOnBody: "Test locationOnBody",
        injuryType: "Test injuryType",
        severity: 1,
        status: "Out",
        mechanism: "Test mechanism",
        injuryDescription: "Test injuryDescription",
        otherNotes: [mockInjuryNote]
    }]
    
    expect(InjuriesPage.getTotalPlayersOut(mockInjury)).toBe(1)
})
