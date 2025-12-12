import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

export enum ApplicationStatus {
  PENDING = 'Pending',
  APPROVED = 'Approved',
  REJECTED = 'Rejected',
}

@Entity('permit_applications')
export class PermitApplication {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'applicant_name', type: 'varchar', length: 255 })
  applicantName: string;

  @Column({ name: 'applicant_email', type: 'varchar', length: 255 })
  applicantEmail: string;

  @Column({ name: 'permit_type', type: 'varchar', length: 255 })
  permitType: string;

  @Column({
    name: 'application_status',
    type: 'enum',
    enum: ApplicationStatus,
    default: ApplicationStatus.PENDING,
  })
  applicationStatus: ApplicationStatus;

  @CreateDateColumn({ name: 'submitted_at', type: 'timestamp' })
  submittedAt: Date;
}

