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
var StudentModel_1;
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const uuid = require("uuid");
const moment = require("moment");
const dynamoDbLib = require("../libs/dynamodb-lib");
const config_service_1 = require("../config/config.service");
const TableNamePrefix = 'automations-students-';
let StudentModel = StudentModel_1 = class StudentModel {
    constructor(configService) {
        this.configService = configService;
        this.logger = new common_1.Logger(StudentModel_1.name);
        const { environment } = this.configService;
        this.tableName = `${TableNamePrefix}${environment}`;
        this.logger.log(`Table name: ${this.tableName}`);
    }
    async create(data) {
        const params = {
            TableName: this.tableName,
            Item: {
                studentId: uuid.v1(),
                studentNames: data.studentNames,
                lastNames: data.lastNames,
                birthdate: data.birthdate,
                settings: data.settings,
                notes: data.notes,
                createdAt: moment().format(),
                updatedAt: null,
            },
        };
        await dynamoDbLib.call('put', params);
        return params.Item;
    }
    async list() {
        const params = {
            TableName: this.tableName,
        };
        const result = await dynamoDbLib.call('scan', params);
        return result.Items;
    }
    async get(id) {
        const params = {
            TableName: this.tableName,
            Key: {
                studentId: id,
            },
        };
        const result = await dynamoDbLib.call('get', params);
        return result.Item;
    }
    async update(id, data) {
        const UpdateExpression = [
            'SET studentNames = :studentNames',
            'lastNames = :lastNames',
            'birthdate = :birthdate',
            'settings = :settings',
            'notes = :notes',
            'updatedAt = :updatedAt',
        ].join(', ');
        const params = {
            TableName: this.tableName,
            Key: {
                studentId: id,
            },
            UpdateExpression,
            ExpressionAttributeValues: {
                ":studentNames": data.studentNames || null,
                ":lastNames": data.lastNames || null,
                ":birthdate": data.birthdate || null,
                ":settings": data.settings || null,
                ":notes": data.notes || null,
                ":updatedAt": moment().format(),
            },
            ReturnValues: "ALL_NEW"
        };
        await dynamoDbLib.call("update", params);
        const updatedRecord = await this.get(id);
        return updatedRecord;
    }
    async delete(id) {
        const params = {
            TableName: this.tableName,
            Key: {
                studentId: id,
            },
        };
        await dynamoDbLib.call("delete", params);
        return id;
    }
};
StudentModel = StudentModel_1 = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject(config_service_1.ConfigService)),
    __metadata("design:paramtypes", [config_service_1.ConfigService])
], StudentModel);
exports.StudentModel = StudentModel;
//# sourceMappingURL=student.model.js.map