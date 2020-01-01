import { Injectable, Logger, Inject } from '@nestjs/common';
import * as uuid from 'uuid';
import * as moment from 'moment';
import * as dynamoDbLib from '../libs/dynamodb-lib';

import { ConfigService } from '../config/config.service';
import { CreateSemesterDTO } from '../semesters/createSemester.dto';

const TableNamePrefix = 'automations-semesters-';

@Injectable()
export class SemesterModel {
  private readonly logger = new Logger(SemesterModel.name);
  private tableName: string;

  constructor(
    @Inject(ConfigService)
    private readonly configService: ConfigService,
  ) {
    const { environment } = this.configService;
    this.tableName = `${TableNamePrefix}${environment}`;
    this.logger.log(`Table name: ${this.tableName}`);
  }

  async create(data: CreateSemesterDTO) {
    const params = {
      TableName: this.tableName,
      Item: {
        semesterId: uuid.v1(),
        semesterName: data.semesterName,
        startDate: data.startDate,
        endDate: data.endDate,
        semesterCurrent: data.semesterCurrent,
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

  async get(semesterId: string) {
    const params = {
      TableName: this.tableName,
      Key: {
        semesterId,
      },
    };
    const result = await dynamoDbLib.call('get', params);
    return result.Item;
  }

  async update(semesterId: string, data: CreateSemesterDTO) {
    const UpdateExpression = [
      'SET semesterName = :semesterName',
      'startDate = :startDate',
      'endDate = :endDate',
      'semesterCurrent = :semesterCurrent',
      'notes = :notes',
      'updatedAt = :updatedAt',
    ].join(', ');
    const params = {
      TableName: this.tableName,
      Key: {
        semesterId,
      },
      UpdateExpression,
      ExpressionAttributeValues: {
        ':semesterName': data.semesterName || null,
        ':startDate': data.startDate || null,
        ':endDate': data.endDate || null,
        ':semesterCurrent': data.semesterCurrent || null,
        ':notes': data.notes || null,
        ':updatedAt': moment().format(),
      },
      ReturnValues: 'ALL_NEW',
    };
    await dynamoDbLib.call('update', params);
    const updatedRecord = await this.get(semesterId);
    return updatedRecord;
  }

  async delete(semesterId: string) {
    const params = {
      TableName: this.tableName,
      Key: {
        semesterId,
      },
    };
    await dynamoDbLib.call('delete', params);
    return semesterId;
  }
}
