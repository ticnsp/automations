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
var CoordinatorsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const coordinator_model_1 = require("../models/coordinator.model");
let CoordinatorsService = CoordinatorsService_1 = class CoordinatorsService {
    constructor() {
        this.logger = new common_1.Logger(CoordinatorsService_1.name);
    }
    getHeathcheck() {
        return 'OK';
    }
    async getCoordinators() {
        const coordinators = await this.coordinatorModel.list();
        return coordinators;
    }
    async getCoordinator(id) {
        const coordinator = await this.coordinatorModel.get(id);
        return coordinator;
    }
    async createCoordinator(coordinatorData) {
        const newCoordinator = await this.coordinatorModel.create(coordinatorData);
        return newCoordinator;
    }
    async updateCoordinator(id, coordinatorData) {
        const updatedCoordinator = await this.coordinatorModel.update(id, coordinatorData);
        return updatedCoordinator;
    }
    async deleteCoordinator(id) {
        const deletedCoordinatorId = await this.coordinatorModel.delete(id);
        return deletedCoordinatorId;
    }
};
__decorate([
    common_1.Inject(coordinator_model_1.CoordinatorModel),
    __metadata("design:type", coordinator_model_1.CoordinatorModel)
], CoordinatorsService.prototype, "coordinatorModel", void 0);
CoordinatorsService = CoordinatorsService_1 = __decorate([
    common_1.Injectable()
], CoordinatorsService);
exports.CoordinatorsService = CoordinatorsService;
//# sourceMappingURL=coordinators.service.js.map