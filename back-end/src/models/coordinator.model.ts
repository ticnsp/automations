import { Injectable, Logger, Inject } from '@nestjs/common';
import * as uuid from 'uuid';
import * as moment from 'moment';
import * as dynamoDbLib from '../libs/dynamodb-lib';

import { ConfigService } from '../config/config.service';
import { CreateCoordinatorDTO } from '../coordinators/createCoordinator.dto';

const TableNamePrefix = 'automations-coordinators-';

@Injectable()
export class CoordinatorModel {
  private readonly logger = new Logger(CoordinatorModel.name);
  private tableName: string;

  constructor(
    @Inject(ConfigService)
    private readonly configService: ConfigService,
  ) {
    const { environment } = this.configService;
    this.tableName = `${TableNamePrefix}${environment}`;
    this.logger.log(`Table name: ${this.tableName}`);
  }

  async create(data: CreateCoordinatorDTO) {
    const params = {
      TableName: this.tableName,
      Item: {
        coordinatorId: uuid.v1(),
        coordinatorNames: data.coordinatorNames,
        lastNames: data.lastNames,
        birthdate: data.birthdate,
        settings: data.settings,
        gender: data.gender,
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
        coordinatorId: id,
      },
    };
    const result = await dynamoDbLib.call('get', params);
    return result.Item;
  }

  async update(id: string, data: CreateCoordinatorDTO) {
    const UpdateExpression = [
      'SET coordinatorNames = :coordinatorNames',
      'lastNames = :lastNames',
      'birthdate = :birthdate',
      'gender = :gender',
      'settings = :settings',
      'notes = :notes',
      'updatedAt = :updatedAt',
    ].join(', ');
    const params = {
      TableName: this.tableName,
      Key: {
        coordinatorId: id,
      },
      UpdateExpression,
      ExpressionAttributeValues: {
        ':coordinatorNames': data.coordinatorNames || null,
        ':lastNames': data.lastNames || null,
        ':birthdate': data.birthdate || null,
        ':gender': data.gender || null,
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
        coordinatorId: id,
      },
    };
    await dynamoDbLib.call('delete', params);
    return id;
  }
}
