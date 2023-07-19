import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { UpdatePhotoDto } from './dto/update-photo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Photo } from './entities/photo.entity';
import { Profile } from 'src/user/entities/profile.entity';

@Injectable()
export class PhotosService {
  constructor(
    @InjectRepository(Photo) private photoRepo: Repository<Photo>,
    @InjectRepository(Profile) private profileRepo: Repository<Profile>,
  ) {}
  async create(createPhotoDto: CreatePhotoDto) {
    const profile = await this.profileRepo.findOne({
      where: { id: createPhotoDto.profileId },
    });
    if (!profile) {
      throw new NotFoundException('profile not found');
    }
    const newPhoto = new Photo();
    newPhoto.profile = profile;
    newPhoto.url = createPhotoDto.url;
    return this.photoRepo.save(newPhoto);
  }

  findAll() {
    return this.photoRepo.find({
      relations: { profile: true },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} photo`;
  }

  update(id: number, updatePhotoDto: UpdatePhotoDto) {
    return `This action updates a #${id} photo`;
  }

  remove(id: number) {
    return `This action removes a #${id} photo`;
  }
}
