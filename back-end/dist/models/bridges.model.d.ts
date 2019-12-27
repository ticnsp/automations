import * as moment from 'moment';
export declare class BridgeModel {
    private readonly logger;
    create(data: any): Promise<{
        coordinatorId: any;
        coordinatorNames: any;
        lastNames: any;
        birthDate: any;
        contacts: any;
        settings: any;
        notes: any;
        createdAt: moment.Moment;
        updatedAt: any;
    }>;
    list(): Promise<any>;
    get(id: string): Promise<any>;
}
