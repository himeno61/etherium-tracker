import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Transaction {
  @PrimaryColumn()
  id: string;

  @Column({
    nullable: false,
  })
  to: string;

  @Column({
    nullable: false,
  })
  from: string;

  @Column({
    nullable: false,
  })
  value: string;

  @Column({ type: 'timestamp' })
  timestamp: Date;

  @CreateDateColumn()
  createdAt: Date;
}
