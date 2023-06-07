import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'Blacklist' })
export class BlacklistEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
  })
  ipAddress: string;

  @CreateDateColumn()
  createdAt: Date;
}
