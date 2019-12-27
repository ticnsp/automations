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
var ConfigService_1;
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const fs = require("fs");
const config_schema_1 = require("./config.schema");
let ConfigService = ConfigService_1 = class ConfigService {
    constructor(filePath) {
        this.logger = new common_1.Logger(ConfigService_1.name);
        let config = {};
        if (filePath && filePath.length) {
            try {
                config = JSON.parse(fs.readFileSync(filePath).toString());
            }
            catch (error) {
                this.logger.error(`Couldn't load config file, using defaults`, error);
            }
            this.envConfig = this.validateInput(config);
            ConfigService_1.service = this;
        }
    }
    static getInstance() {
        if (!this.service) {
            const configService = new ConfigService_1();
            this.service = configService;
        }
        return this.service;
    }
    validateInput(envConfig) {
        const { error, value: validatedEnvConfig } = config_schema_1.configurationSchema.validate(envConfig);
        if (error) {
            throw new Error(`Configuration validation error: ${error.message}`);
        }
        return validatedEnvConfig;
    }
    get(key) {
        return this.envConfig[key];
    }
    get environment() {
        const { ENVIRONMENT } = this.envConfig;
        return ENVIRONMENT;
    }
    get awsRegion() {
        const { AWS_REGION } = this.envConfig;
        return AWS_REGION;
    }
};
ConfigService = ConfigService_1 = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [String])
], ConfigService);
exports.ConfigService = ConfigService;
//# sourceMappingURL=config.service.js.map