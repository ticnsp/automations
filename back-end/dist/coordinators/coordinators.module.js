"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const config_module_1 = require("../config/config.module");
const coordinators_controller_1 = require("./coordinators.controller");
const coordinators_service_1 = require("./coordinators.service");
const coordinator_model_1 = require("../models/coordinator.model");
let CoordinatorsModule = class CoordinatorsModule {
};
CoordinatorsModule = __decorate([
    common_1.Module({
        imports: [config_module_1.ConfigModule],
        controllers: [coordinators_controller_1.CoordinatorsController],
        providers: [coordinators_service_1.CoordinatorsService, coordinator_model_1.CoordinatorModel],
    })
], CoordinatorsModule);
exports.CoordinatorsModule = CoordinatorsModule;
//# sourceMappingURL=coordinators.module.js.map