"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const bridges_controller_1 = require("./bridges.controller");
const bridges_service_1 = require("./bridges.service");
const bridges_model_1 = require("../models/bridges.model");
let BridgesModule = class BridgesModule {
};
BridgesModule = __decorate([
    common_1.Module({
        controllers: [bridges_controller_1.BridgesController],
        providers: [bridges_service_1.BridgesService, bridges_model_1.BridgeModel],
    })
], BridgesModule);
exports.BridgesModule = BridgesModule;
//# sourceMappingURL=bridges.module.js.map