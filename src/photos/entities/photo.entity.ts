import { Profile } from 'src/user/entities/profile.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Photo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @ManyToOne(() => Profile, (profile) => profile.photos)
  @JoinColumn({ name: 'profile_id' })
  profile: Profile;
}
