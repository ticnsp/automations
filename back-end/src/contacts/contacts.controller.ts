import {
  Inject,
  Controller,
  Body,
  Param,
  Get,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { CreateContactDTO } from './createContact.dto';

@Controller('contacts')
export class ContactsController {

  @Inject(ContactsService)
  private readonly contactsService: ContactsService;

  @Get('healthcheck')
  getHealthcheck() {
    return this.contactsService.getHeathcheck();
  }

  @Post(':ownerId')
  async createContact(@Param('ownerId') ownerId: string, @Body() body: CreateContactDTO) {
    return await this.contactsService.createContact(ownerId, body);
  }

  @Get()
  async getContacts() {
    return await this.contactsService.getContacts();
  }

  @Get(':ownerId')
  async getContactsForOwner(@Param('ownerId') ownerId: string) {
    return await this.contactsService.getContactsForOwner(ownerId);
  }

  @Put(':ownerId/:contactId')
  async updateContact(@Param('ownerId') ownerId: string, @Param('contactId') contactId: string, @Body() body: CreateContactDTO) {
    return await this.contactsService.updateContact(ownerId, contactId, body);
  }

  @Delete(':ownerId/:contactId')
  async deleteContact(@Param('ownerId') ownerId: string, @Param('contactId') contactId: string) {
    return await this.contactsService.deleteContact(ownerId, contactId);
  }
}
