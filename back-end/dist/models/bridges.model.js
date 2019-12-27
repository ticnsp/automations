"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var BridgeModel_1;
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const uuid_1 = require("uuid");
const moment = require("moment");
const dynamoDbLib = require("../libs/dynamodb-lib");
const TableName = 'bridges';
let BridgeModel = BridgeModel_1 = class BridgeModel {
    constructor() {
        this.logger = new common_1.Logger(BridgeModel_1.name);
    }
    async create(data) {
        const params = {
            TableName,
            Item: {
                coordinatorId: uuid_1.default.v1(),
                coordinatorNames: data.coordinatorNames,
                lastNames: data.lastNames,
                birthDate: data.birthDate,
                contacts: data.contacts,
                settings: data.settings,
                notes: data.notes,
                createdAt: moment(),
                updatedAt: null,
            },
        };
        await dynamoDbLib.call('put', params);
        return params.Item;
    }
    async list() {
        const params = {
            TableName,
        };
        const result = await dynamoDbLib.call('scan', params);
        return result.Items;
    }
    async get(id) {
        const params = {
            TableName,
            Key: {
                coordinatorId: id,
            },
        };
        const result = await dynamoDbLib.call('get', params);
        return result.Item;
    }
};
BridgeModel = BridgeModel_1 = __decorate([
    common_1.Injectable()
], BridgeModel);
exports.BridgeModel = BridgeModel;
//# sourceMappingURL=bridges.model.js.map