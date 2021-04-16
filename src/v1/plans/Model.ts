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
  JoinColumn
} from "typeorm"

import License from '../licenses/Model'
import App from '../apps/Model'

@Entity()
@Unique(["app", "slug"])
export default class Plan extends BaseEntity {
    
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "uuid", nullable: false })
  appId: string;

  @ManyToOne(() => App, app => app.plans)
  @JoinColumn({ name: "appId" })
  app: App;

  @Column({ nullable: false, default: 'FREE!' })
  name: string;

  @Column({ nullable: false, default: 'free' })
  slug: string;

  @Column({ nullable: true })
  price: number;

  @Column({ type: "json", nullable: true })
  details: string;

  @Column({ nullable: true })
  purchaseUrl: string;

  // our products and services
  @OneToMany(() => License, license => license.plan)
  licenses: License[];

  // features
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

  // resource access per month
  @Column({ default: 45 })
  limitOnlineVisitors: number; // in #: active visitors with a 15 min timeframe
  @Column({ default: 3 })
  limitFileStorage: number; // in GB: media uploaded to CDN
  @Column({ default: 2 })
  limitEventSources: number; // in GB: event sources logged in MongoDB
  @Column({ default: 1 })
  limitDatabaseRecords: number; // in GB: records saved in PostgresQL

  // customize
  @Column({ type: "json", nullable: true })
  raw: string;

  // details
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