import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import { CreatePermitApplicationDto } from './dto/create-permit-application.dto';
import { PaginationQueryDto } from './dto/pagination-query.dto';
import { PermitApplication } from './entities/permit-application.entity';
import { PermitsService } from './permits.service';

@Controller('permits')
export class PermitsController {
  constructor(private readonly permitsService: PermitsService) {}

  @Get()
  async findAll(@Query() paginationQuery: PaginationQueryDto): Promise<
    | PermitApplication[]
    | {
        data: PermitApplication[];
        total: number;
        pageNumber: number;
        size: number;
        totalPages: number;
      }
  > {
    // If pagination parameters are provided, return paginated response
    if (paginationQuery.pageNumber || paginationQuery.size) {
      const pageNumber = paginationQuery.pageNumber || 1;
      const size = paginationQuery.size || 6;
      return this.permitsService.findAllPaginated(pageNumber, size);
    }

    // Otherwise, return all results (backward compatibility)
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
