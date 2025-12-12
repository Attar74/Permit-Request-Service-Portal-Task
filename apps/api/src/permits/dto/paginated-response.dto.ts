import { PermitApplication } from '../entities/permit-application.entity';

export class PaginatedResponseDto {
  data: PermitApplication[];
  total: number;
  pageNumber: number;
  size: number;
  totalPages: number;
}
