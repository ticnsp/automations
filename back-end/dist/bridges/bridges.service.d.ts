import { CreateBridgeDTO } from './createBridge.dto';
export declare class BridgesService {
    private readonly bridgesModel;
    getHeathcheck(): string;
    getBridges(): Promise<any>;
    getBridge(id: any): Promise<any>;
    createBridge(birdgeData: CreateBridgeDTO): Promise<any>;
}
