import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreatePermitApplicationDto {
  @IsNotEmpty({ message: 'Applicant name is required' })
  @IsString({ message: 'Applicant name must be a string' })
  applicantName: string;

  @IsNotEmpty({ message: 'Applicant email is required' })
  @IsEmail({}, { message: 'Applicant email must be a valid email address' })
  applicantEmail: string;

  @IsNotEmpty({ message: 'Permit type is required' })
  @IsString({ message: 'Permit type must be a string' })
  permitType: string;
}
