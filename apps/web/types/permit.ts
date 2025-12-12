export enum ApplicationStatus {
  PENDING = 'Pending',
  APPROVED = 'Approved',
  REJECTED = 'Rejected',
}

export interface PermitApplication {
  id: number;
  applicantName: string;
  applicantEmail: string;
  permitType: string;
  applicationStatus: ApplicationStatus;
  submittedAt: string; // ISO date string
}

export interface CreatePermitApplication {
  applicantName: string;
  applicantEmail: string;
  permitType: string;
}
