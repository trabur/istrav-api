import {
  BaseEntity,
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
  VersionColumn,
  ManyToOne,
  Unique,
  JoinColumn,
  ManyToMany,
  JoinTable
} from "typeorm"
import { Length, IsNotEmpty } from "class-validator"

import App from '../apps/Model'
import Guide from '../guides/Model'
import User from '../users/Model'

@Entity()
@Unique(["app", "slug"])
export default class Video extends BaseEntity {
    
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "uuid", nullable: false })
  appId: string;

  @ManyToOne(() => App, app => app.users)
  @JoinColumn({ name: "appId" })
  app: App;

  @Column()
  name: string;

  @Column()
  slug: string;

  @Column({ default: 1 })
  viewCount: number;

  @ManyToMany(() => Guide, guide => guide.videos)
  @JoinTable()
  guides: Guide[];

  @Column({ nullable: true })
  image: string;
  @Column({ nullable: true })
  video: string;
  @Column({ nullable: true })
  description: string;

  @Column({ type: "uuid", nullable: true })
  contentCreatorId: string;

  @ManyToOne(() => User, user => user.videos)
  @JoinColumn({ name: "contentCreatorId" })
  contentCreator: User;

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