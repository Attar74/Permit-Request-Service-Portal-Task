import { ApplicationStatus } from '../entities/permit-application.entity';

export class PermitApplicationResponseDto {
  id: number;
  applicantName: string;
  applicantEmail: string;
  permitType: string;
  applicationStatus: ApplicationStatus;
  submittedAt: Date;
}

