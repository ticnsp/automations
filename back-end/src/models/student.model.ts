import { Injectable, Logger, Inject } from '@nestjs/common';
import * as uuid from 'uuid';
import * as moment from 'moment';
import * as dynamoDbLib from '../libs/dynamodb-lib';

import { ConfigService } from '../config/config.service';
import { CreateStudentDTO } from '../students/createStudent.dto';

const TableNamePrefix = 'automations-students-';

@Injectable()
export class StudentModel {
  private readonly logger = new Logger(StudentModel.name);
  private tableName: string;

  constructor(
    @Inject(ConfigService)
    private readonly configService: ConfigService,
  ) {
    const { environment } = this.configService;
    this.tableName = `${TableNamePrefix}${environment}`;
    this.logger.log(`Table name: ${this.tableName}`);
  }

  async create(data: CreateStudentDTO) {
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

  async get(id: string) {
    const params = {
      TableName: this.tableName,
      Key: {
        studentId: id,
      },
    };
    const result = await dynamoDbLib.call('get', params);
    return result.Item;
  }

  async update(id: string, data: CreateStudentDTO) {
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
        ':studentNames': data.studentNames || null,
        ':lastNames': data.lastNames || null,
        ':birthdate': data.birthdate || null,
        ':settings': data.settings || null,
        ':notes': data.notes || null,
        ':updatedAt': moment().format(),
      },
      ReturnValues: 'ALL_NEW',
    };
    await dynamoDbLib.call('update', params);
    const updatedRecord = await this.get(id);
    return updatedRecord;
  }

  async delete(id: string) {
    const params = {
      TableName: this.tableName,
      Key: {
        studentId: id,
      },
    };
    await dynamoDbLib.call('delete', params);
    return id;
  }
}
