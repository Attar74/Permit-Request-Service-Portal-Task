import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePermitApplicationDto } from './dto/create-permit-application.dto';
import {
  ApplicationStatus,
  PermitApplication,
} from './entities/permit-application.entity';

@Injectable()
export class PermitsService {
  constructor(
    @InjectRepository(PermitApplication)
    private permitRepository: Repository<PermitApplication>,
  ) {}

  async findAll(): Promise<PermitApplication[]> {
    return this.permitRepository.find({
      order: {
        submittedAt: 'DESC',
      },
    });
  }

  async create(
    createPermitDto: CreatePermitApplicationDto,
  ): Promise<PermitApplication> {
    const permit = this.permitRepository.create({
      ...createPermitDto,
      applicationStatus: ApplicationStatus.PENDING,
    });

    return this.permitRepository.save(permit);
  }
}
