import {
  BaseEntity,
  Entity,
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
  JoinTable,
  OneToMany
} from "typeorm"

import App from '../apps/Model'
import Guide from '../guides/Model'
import User from '../users/Model'
import Block from '../blocks/Model'

@Entity()
@Unique(["app", "slug"])
export default class Video extends BaseEntity {
  // unique
  @PrimaryGeneratedColumn("uuid")
  id: string;

  // multi-tenant SaaS
  @Column({ type: "uuid", nullable: false })
  appId: string;

  @ManyToOne(() => App, app => app.users)
  @JoinColumn({ name: "appId" })
  app: App;

  // front-page landing
  @OneToMany(() => Block, block => block.video)
  pageBlocks: Block[];

  // display
  @Column()
  name: string;

  // identification
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

  // record keeping
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