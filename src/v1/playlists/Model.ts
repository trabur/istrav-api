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
  OneToMany
} from "typeorm"

import App from '../apps/Model'
import Guide from '../guides/Model'
import Block from '../blocks/Model'

@Entity()
@Unique(["app", "slug"])
export default class Playlist extends BaseEntity {
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
  @OneToMany(() => Block, block => block.playlist)
  pageBlocks: Block[];

  // display
  @Column()
  name: string;

  // identification
  @Column()
  slug: string;
  
  @Column({ nullable: true })
  image: string;

  @ManyToMany(() => Guide, guide => guide.playlists)
  guides: Guide[];

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