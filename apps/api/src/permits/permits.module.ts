import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermitsController } from './permits.controller';
import { PermitsService } from './permits.service';
import { PermitApplication } from './entities/permit-application.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PermitApplication])],
  controllers: [PermitsController],
  providers: [PermitsService],
  exports: [PermitsService],
})
export class PermitsModule {}

