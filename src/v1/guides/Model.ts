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
import Video from '../videos/Model'
import Playlist from '../playlists/Model'
import Block from '../blocks/Model'

@Entity()
@Unique(["app", "slug"])
export default class Guide extends BaseEntity {
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
  @OneToMany(() => Block, block => block.guide)
  pageBlocks: Block[];

  // display
  @Column()
  name: string;

  // identification
  @Column()
  slug: string;
  
  @Column({ nullable: true })
  image: string;

  @ManyToMany(() => Video, video => video.guides)
  videos: Video[];

  @ManyToMany(() => Playlist, playlist => playlist.guides)
  @JoinTable()
  playlists: Playlist[];

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