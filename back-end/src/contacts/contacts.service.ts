import { Inject, Injectable, Logger } from '@nestjs/common';
import { ContactModel } from '../models/contact.model';
import { CreateContactDTO } from './createContact.dto';

@Injectable()
export class ContactsService {
  private readonly logger = new Logger(ContactsService.name);
  @Inject(ContactModel)
  private readonly contactModel: ContactModel;

  getHeathcheck(): string {
    return 'OK';
  }

  async getContacts(): Promise<any> {
    const contacts = await this.contactModel.list();
    return contacts;
  }

  async createContact(ownerId: string, contactData: CreateContactDTO): Promise<any> {
    const newContact = await this.contactModel.create(ownerId, contactData);
    return newContact;
  }

  async getContactsForOwner(ownerId: string): Promise<any[]> {
    const coordinatorContacts = await this.contactModel.query(ownerId);
    return coordinatorContacts;
  }

  async updateContact(ownerId: string, contactId: string, contactData: CreateContactDTO): Promise<any> {
    const updatedContact = await this.contactModel.update(ownerId, contactId, contactData);
    return updatedContact;
  }

  async deleteContact(ownerId: string, contactId: string): Promise<string> {
    const deletedContactId = await this.contactModel.delete(ownerId, contactId);
    return deletedContactId;
  }
}
