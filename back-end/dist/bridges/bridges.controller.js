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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const bridges_service_1 = require("./bridges.service");
const createBridge_dto_1 = require("./createBridge.dto");
let BridgesController = class BridgesController {
    getHealthcheck() {
        return this.bridgesService.getHeathcheck();
    }
    async getBridges() {
        return await this.bridgesService.getBridges();
    }
    async getBridge(id) {
        return await this.bridgesService.getBridge(id);
    }
    async createBridge(body) {
        return await this.bridgesService.createBridge(body);
    }
};
__decorate([
    common_1.Inject('BridgesService'),
    __metadata("design:type", bridges_service_1.BridgesService)
], BridgesController.prototype, "bridgesService", void 0);
__decorate([
    common_1.Get('healthcheck'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BridgesController.prototype, "getHealthcheck", null);
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BridgesController.prototype, "getBridges", null);
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BridgesController.prototype, "getBridge", null);
__decorate([
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createBridge_dto_1.CreateBridgeDTO]),
    __metadata("design:returntype", Promise)
], BridgesController.prototype, "createBridge", null);
BridgesController = __decorate([
    common_1.Controller('bridges')
], BridgesController);
exports.BridgesController = BridgesController;
//# sourceMappingURL=bridges.controller.js.map