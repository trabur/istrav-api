import {
  BaseEntity,
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
  DeleteDateColumn,
  VersionColumn,
  Index,
  Unique
} from "typeorm"
import { Length, IsNotEmpty } from "class-validator"

import App from '../apps/Model'

@Entity()
@Unique(["firstName", "lastName"])
export default class Member extends BaseEntity {
    
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  @Index({ unique: true })
  email: string;

  @Column()
  @Length(4, 20)
  @Index({ unique: true })
  username: string;

  @Column()
  @Length(4, 100)
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @OneToMany(() => App, app => app.owner)
  apps: App[];

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  @DeleteDateColumn()
  deletedAt: Date;

  @Column()
  @VersionColumn()
  version: number;
  
}