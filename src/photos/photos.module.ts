import { Module } from '@nestjs/common';
import { PhotosService } from './photos.service';
import { PhotosController } from './photos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Photo } from './entities/photo.entity';
import { Profile } from 'src/user/entities/profile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Photo, Profile])],

  controllers: [PhotosController],
  providers: [PhotosService],
})
export class PhotosModule {}
