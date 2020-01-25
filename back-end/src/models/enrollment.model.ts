import { Injectable, Logger, Inject } from '@nestjs/common';
import * as uuid from 'uuid';
import * as moment from 'moment';
import * as dynamoDbLib from '../libs/dynamodb-lib';

import { ConfigService } from '../config/config.service';
import { CreateEnrollmentDTO } from '../enrollments/createEnrollment.dto';

const TableNamePrefix = 'automations-enrollments-';

@Injectable()
export class EnrollmentModel {
  private readonly logger = new Logger(EnrollmentModel.name);
  private tableName: string;

  constructor(
    @Inject(ConfigService)
    private readonly configService: ConfigService,
  ) {
    const { environment } = this.configService;
    this.tableName = `${TableNamePrefix}${environment}`;
    this.logger.log(`Table name: ${this.tableName}`);
  }

  async create(semesterId: string, data: CreateEnrollmentDTO) {
    const params = {
      TableName: this.tableName,
      Item: {
        semesterId,
        enrollmentId: uuid.v1(),
        enrollmentType: data.enrollmentType,
        enrolledId: data.enrolledId,
        paid: data.paid,
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

  async get(semesterId: string, enrollmentId: string) {
     const params = {
      TableName: this.tableName,
      Key: {
        semesterId,
        enrollmentId,
      },
    };
    const result = await dynamoDbLib.call('get', params);
    return result.Item;
  }

  async query(semesterId: string, otherParams: any = {}) {
    const KeyConditionExpression = 'semesterId = :semesterId';
    const initialExpressionAttributeValues = {
      ':semesterId': semesterId,
    };
    const { FilterExpression, ExpressionAttributeValues } =
      dynamoDbLib.processOtherParamsForQueries(
        initialExpressionAttributeValues,
        otherParams,
      );
    let params: any = {
      TableName: this.tableName,
      KeyConditionExpression,
      ExpressionAttributeValues,
    };
    if (FilterExpression) {
      params = {
        ...params,
        FilterExpression,
      };
    }
    const result = await dynamoDbLib.call('query', params);
    return result.Items;
  }

  async update(semesterId: string, enrollmentId: string, data: CreateEnrollmentDTO) {
   const UpdateExpression = [
      'SET enrollmentType = :enrollmentType',
      'enrolledId = :enrolledId',
      'paid = :paid',
      'updatedAt = :updatedAt',
    ].join(', ');
    const params = {
      TableName: this.tableName,
      Key: {
        semesterId,
        enrollmentId,
      },
      UpdateExpression,
      ExpressionAttributeValues: {
        ':enrollmentType': data.enrollmentType || null,
        ':enrolledId': data.enrolledId || null,
        ':paid': data.paid || null,
        ':updatedAt': moment().format(),
      },
      ReturnValues: 'ALL_NEW',
    };
    await dynamoDbLib.call('update', params);
    const updatedRecord = await this.get(semesterId, enrollmentId);
    return updatedRecord;
  }

  async delete(semesterId: string, enrollmentId: string) {
    const params = {
      TableName: this.tableName,
      Key: {
        semesterId,
        enrollmentId,
      },
    };
    await dynamoDbLib.call('delete', params);
    return `${semesterId}-${enrollmentId}`;
  }
}
