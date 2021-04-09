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
  ManyToMany
} from "typeorm"
import { Length, IsNotEmpty } from "class-validator"

import App from '../apps/Model'
import Video from '../videos/Model'

@Entity()
@Unique(["app", "slug"])
export default class Guide extends BaseEntity {
    
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
  
  @Column({ nullable: true })
  image: string;

  @ManyToMany(() => Video, video => video.guides)
  videos: Video[];

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