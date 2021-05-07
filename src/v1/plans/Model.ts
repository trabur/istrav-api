import {
  BaseEntity,
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
  VersionColumn,
  Unique,
  OneToMany,
  ManyToOne,
  JoinColumn,
  OneToOne
} from "typeorm"

import License from '../licenses/Model'
import App from '../apps/Model'
import Product from '../products/Model'
import Collection from '../collections/Model'
import Playlist from '../playlists/Model'
import Block from '../blocks/Model'

@Entity()
@Unique(["app", "slug"])
export default class Plan extends BaseEntity {
  // unique
  @PrimaryGeneratedColumn("uuid")
  id: string;

  // multi-tenant SaaS
  @Column({ type: "uuid", nullable: false })
  appId: string;

  @ManyToOne(() => App, app => app.plans)
  @JoinColumn({ name: "appId" })
  app: App;

  // front-page landing
  @OneToMany(() => Block, block => block.plan)
  pageBlocks: Block[];

  // direct user to purchase plan by product in the storefront
  @Column({ type: "uuid", nullable: true })
  purchaseId: string;

  @OneToOne(() => Product)
  @JoinColumn({ name: "purchaseId" })
  purchase: Product;
  
  // display
  @Column({ nullable: false, default: 'FREE!' })
  name: string;

  // identification
  @Column({ nullable: false, default: 'free' })
  slug: string;

  @Column({ nullable: true })
  price: number;

  @Column({ type: "json", nullable: true })
  details: string;

  // our products and services
  @OneToMany(() => License, license => license.plan)
  licenses: License[];

  // cloud on demand license key
  @Column({ default: true })
  grantApplicationAccess: boolean
  @Column({ default: true })
  grantMarketing: boolean
  @Column({ default: true })
  grantShop: boolean
  @Column({ default: true })
  grantForum: boolean
  @Column({ default: true })
  grantChannel: boolean
  @Column({ default: true })
  grantPromo: boolean
  @Column({ default: true })
  grantHosting: boolean
  @Column({ default: false })
  grantWhiteLabel: boolean

  // content on demand collection
  @Column({ default: true })
  grantCollectionAccess: boolean

  @Column({ type: "uuid", nullable: true })
  grantCollectionId: string;
  @OneToOne(() => Collection)
  @JoinColumn({ name: "grantCollectionId" })
  grantCollection: Collection;

  // content on demand playlist
  @Column({ default: true })
  grantPlaylistAccess: boolean

  @Column({ type: "uuid", nullable: true })
  grantPlaylistId: string;
  @OneToOne(() => Playlist)
  @JoinColumn({ name: "grantPlaylistId" })
  grantPlaylist: Playlist;

  // content on demand forum
  @Column({ default: true })
  grantBulletinBoardAccess: boolean

  // content on demand hosting
  @Column({ default: true })
  grantHostingAccess: boolean

  // extra
  @Column({ type: "json", nullable: true })
  raw: string;

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