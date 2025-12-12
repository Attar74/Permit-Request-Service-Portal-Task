import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { PermitApplication } from '../permits/entities/permit-application.entity';
import { seedPermits } from '../permits/permits.seed';

// Load environment variables
config();

async function bootstrap() {
  const dataSource = new DataSource({
    type: 'postgres',
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT || '5432', 10),
    username: process.env.DATABASE_USER || 'postgres',
    password: process.env.DATABASE_PASSWORD || 'postgres',
    database: process.env.DATABASE_NAME || 'permit_service',
    entities: [PermitApplication],
    synchronize: false, // Don't auto-sync in seed script
    logging: false,
  });

  try {
    await dataSource.initialize();
    console.log('📦 Database connected');

    await seedPermits(dataSource);

    await dataSource.destroy();
    console.log('✅ Seed completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    await dataSource.destroy();
    process.exit(1);
  }
}

bootstrap();

