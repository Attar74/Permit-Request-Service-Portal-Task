import { DataSource } from 'typeorm';
import {
  PermitApplication,
  ApplicationStatus,
} from './entities/permit-application.entity';

export async function seedPermits(dataSource: DataSource): Promise<void> {
  const repository = dataSource.getRepository(PermitApplication);

  // Check if data already exists
  const count = await repository.count();
  if (count > 0) {
    console.log('⚠️  Permit applications already exist. Skipping seed.');
    return;
  }

  const samplePermits: Partial<PermitApplication>[] = [
    {
      applicantName: 'Ahmed Ali Al-Saud',
      applicantEmail: 'ahmed.ali@example.com',
      permitType: 'Construction Permit',
      applicationStatus: ApplicationStatus.PENDING,
    },
    {
      applicantName: 'Fatima Mohammed',
      applicantEmail: 'fatima.m@example.com',
      permitType: 'Business License',
      applicationStatus: ApplicationStatus.APPROVED,
    },
    {
      applicantName: 'Khalid Ibrahim',
      applicantEmail: 'khalid.i@example.com',
      permitType: 'Event Permit',
      applicationStatus: ApplicationStatus.REJECTED,
    },
    {
      applicantName: 'Sara Abdullah',
      applicantEmail: 'sara.a@example.com',
      permitType: 'Renovation Permit',
      applicationStatus: ApplicationStatus.PENDING,
    },
    {
      applicantName: 'Mohammed Hassan',
      applicantEmail: 'mohammed.h@example.com',
      permitType: 'Commercial License',
      applicationStatus: ApplicationStatus.APPROVED,
    },
  ];

  const permits = repository.create(samplePermits);
  await repository.save(permits);

  console.log(`✅ Seeded ${permits.length} permit applications`);
}
