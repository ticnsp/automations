import { Module } from '@nestjs/common';
import { ConfigModule } from '../config/config.module';
import { ContactsController } from './contacts.controller';
import { ContactsService } from './contacts.service';
import { ContactModel } from '../models/contact.model';

@Module({
  imports: [ConfigModule],
  controllers: [ContactsController],
  providers: [ContactsService, ContactModel],
})
export class ContactsModule {}
