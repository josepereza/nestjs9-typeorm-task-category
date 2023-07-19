import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Profile } from './entities/profile.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private usersRepo: Repository<User>,
    @InjectRepository(Profile) private profilesRepo: Repository<Profile>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const profile = new Profile();
    profile.name = createUserDto.name;
    profile.lastName = createUserDto.lastName;
    const newProfile = await this.profilesRepo.save(profile);

    const user = new User();
    user.email = createUserDto.email;
    user.password = createUserDto.password;
    user.profile = newProfile;
    return this.usersRepo.save(user);
  }

  findAll() {
    return this.usersRepo.find({
      relations: {
        profile: true,
        tasks: true,
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
