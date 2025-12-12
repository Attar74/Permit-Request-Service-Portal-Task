import {
  Controller,
  Get,
  Post,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { PermitsService } from './permits.service';
import { CreatePermitApplicationDto } from './dto/create-permit-application.dto';
import { PermitApplication } from './entities/permit-application.entity';

@Controller('permits')
export class PermitsController {
  constructor(private readonly permitsService: PermitsService) {}

  @Get()
  async findAll(): Promise<PermitApplication[]> {
    return this.permitsService.findAll();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createPermitDto: CreatePermitApplicationDto,
  ): Promise<PermitApplication> {
    return this.permitsService.create(createPermitDto);
  }
}

