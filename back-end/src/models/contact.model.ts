import { Injectable, Logger, Inject } from '@nestjs/common';
import * as uuid from 'uuid';
import * as moment from 'moment';
import * as dynamoDbLib from '../libs/dynamodb-lib';

import { ConfigService } from '../config/config.service';
import { CreateContactDTO } from '../contacts/createContact.dto';

const TableNamePrefix = 'automations-contacts-';

@Injectable()
export class ContactModel {
  private readonly logger = new Logger(ContactModel.name);
  private tableName: string;

  constructor(
    @Inject(ConfigService)
    private readonly configService: ConfigService,
  ) {
    const { environment } = this.configService;
    this.tableName = `${TableNamePrefix}${environment}`;
    this.logger.log(`Table name: ${this.tableName}`);
  }

  async create(ownerId: string, data: CreateContactDTO) {
    const params = {
      TableName: this.tableName,
      Item: {
        ownerId,
        contactId: uuid.v1(),
        contactType: data.contactType,
        content: data.content,
        defaultContact: data.defaultContact,
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

  async get(ownerId: string, contactId: string) {
     const params = {
      TableName: this.tableName,
      Key: {
        ownerId,
        contactId,
      },
    };
    const result = await dynamoDbLib.call('get', params);
    return result.Item;
  }

  async query(ownerId: string) {
    const KeyConditionExpression = 'ownerId = :ownerId';
    const params = {
      TableName: this.tableName,
      KeyConditionExpression,
      ExpressionAttributeValues: {
        ':ownerId': ownerId,
      },
    };
    const result = await dynamoDbLib.call('query', params);
    return result.Items;
  }

  async update(ownerId: string, contactId: string, data: CreateContactDTO) {
   const UpdateExpression = [
      'SET contactType = :contactType',
      'defaultContact = :defaultContact',
      'content = :content',
      'updatedAt = :updatedAt',
    ].join(', ');
    const params = {
      TableName: this.tableName,
      Key: {
        ownerId,
        contactId,
      },
      UpdateExpression,
      ExpressionAttributeValues: {
        ':contactType': data.contactType || null,
        ':defaultContact': data.defaultContact || null,
        ':content': data.content || null,
        ':updatedAt': moment().format(),
      },
      ReturnValues: 'ALL_NEW',
    };
    await dynamoDbLib.call('update', params);
    const updatedRecord = await this.get(ownerId, contactId);
    return updatedRecord;
  }

  async delete(ownerId: string, contactId: string) {
    const params = {
      TableName: this.tableName,
      Key: {
        ownerId,
        contactId,
      },
    };
    await dynamoDbLib.call('delete', params);
    return `${ownerId}-${contactId}`;
  }
}
