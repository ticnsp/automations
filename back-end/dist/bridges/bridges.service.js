"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const bridges_model_1 = require("../models/bridges.model");
let BridgesService = class BridgesService {
    getHeathcheck() {
        return 'OK';
    }
    async getBridges() {
        const bridges = await this.bridgesModel.list();
        return bridges;
    }
    async getBridge(id) {
        const bridge = await this.bridgesModel.get(id);
        return bridge;
    }
    async createBridge(birdgeData) {
        const newBridge = await this.bridgesModel.create(birdgeData);
        return newBridge;
    }
};
__decorate([
    common_1.Inject(bridges_model_1.BridgeModel),
    __metadata("design:type", bridges_model_1.BridgeModel)
], BridgesService.prototype, "bridgesModel", void 0);
BridgesService = __decorate([
    common_1.Injectable()
], BridgesService);
exports.BridgesService = BridgesService;
//# sourceMappingURL=bridges.service.js.map