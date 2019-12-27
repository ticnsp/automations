import { CreateBridgeDTO } from './createBridge.dto';
export declare class BridgesController {
    private readonly bridgesService;
    getHealthcheck(): string;
    getBridges(): Promise<any>;
    getBridge(id: string): Promise<any>;
    createBridge(body: CreateBridgeDTO): Promise<any>;
}
