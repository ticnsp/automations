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
const coordinators_service_1 = require("./coordinators.service");
const createCoordinator_dto_1 = require("./createCoordinator.dto");
let CoordinatorsController = class CoordinatorsController {
    getHealthcheck() {
        return this.coordinatorsService.getHeathcheck();
    }
    async createCoordinator(body) {
        return await this.coordinatorsService.createCoordinator(body);
    }
    async getCoordinators() {
        return await this.coordinatorsService.getCoordinators();
    }
    async getCoordinator(id) {
        return await this.coordinatorsService.getCoordinator(id);
    }
    async updateCoordinator(id, body) {
        return await this.coordinatorsService.updateCoordinator(id, body);
    }
    async deleteCoordinator(id) {
        return await this.coordinatorsService.deleteCoordinator(id);
    }
};
__decorate([
    common_1.Inject(coordinators_service_1.CoordinatorsService),
    __metadata("design:type", coordinators_service_1.CoordinatorsService)
], CoordinatorsController.prototype, "coordinatorsService", void 0);
__decorate([
    common_1.Get('healthcheck'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CoordinatorsController.prototype, "getHealthcheck", null);
__decorate([
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createCoordinator_dto_1.CreateCoordinatorDTO]),
    __metadata("design:returntype", Promise)
], CoordinatorsController.prototype, "createCoordinator", null);
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CoordinatorsController.prototype, "getCoordinators", null);
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CoordinatorsController.prototype, "getCoordinator", null);
__decorate([
    common_1.Put(':id'),
    __param(0, common_1.Param('id')), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, createCoordinator_dto_1.CreateCoordinatorDTO]),
    __metadata("design:returntype", Promise)
], CoordinatorsController.prototype, "updateCoordinator", null);
__decorate([
    common_1.Delete(':id'),
    __param(0, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CoordinatorsController.prototype, "deleteCoordinator", null);
CoordinatorsController = __decorate([
    common_1.Controller('coordinators')
], CoordinatorsController);
exports.CoordinatorsController = CoordinatorsController;
//# sourceMappingURL=coordinators.controller.js.map