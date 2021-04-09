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

  @ManyToMany(() => Guide, guide => guide.videos)
  @JoinTable()
  guides: Guide[];

  @Column({ nullable: true })
  image: string;
  @Column({ nullable: true })
  video: string;
  @Column({ nullable: true })
  description: string;

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