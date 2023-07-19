import { Profile } from '../entities/profile.entity';

export class CreateUserDto {
  name: string;
  lastName: string;
  email: string;
  password: string;
  profile: Profile;
}
