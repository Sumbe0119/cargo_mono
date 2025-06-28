import { Module } from '@nestjs/common';
import { BotController } from './bot.controller';
import { OrganizationModule } from '../organization/organization.module';

@Module({
  imports: [OrganizationModule],
  controllers: [BotController],
})
export class BotModule {}
