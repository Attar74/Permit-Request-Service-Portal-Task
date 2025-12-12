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

  async findAllPaginated(
    pageNumber: number = 1,
    size: number = 6,
  ): Promise<{
    data: PermitApplication[];
    total: number;
    pageNumber: number;
    size: number;
    totalPages: number;
  }> {
    const [data, total] = await this.permitRepository.findAndCount({
      order: {
        submittedAt: 'DESC',
      },
      skip: (pageNumber - 1) * size,
      take: size,
    });

    const totalPages = Math.ceil(total / size);

    return {
      data,
      total,
      pageNumber,
      size,
      totalPages,
    };
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
