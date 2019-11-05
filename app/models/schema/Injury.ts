import {
    attribute,
    autoGeneratedHashKey,
    rangeKey,
    table,
} from '@aws/dynamodb-data-mapper-annotations';

@table('InjuryReports')
export class Injury {
    @autoGeneratedHashKey()
    id: string;

    @rangeKey({defaultProvider: () => new Date()})
    createdAt: Date;

    @attribute()
    createdBy: string;

    @attribute()
    athlete: string;

    @attribute()
    description: string;
}
