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

  // direct user to purchase plan by product in the storefront
  @Column({ type: "uuid", nullable: true })
  purchaseId: string;

  @OneToOne(() => Product)
  @JoinColumn({ name: "purchaseId" })
  purchase: Product;
  
  @Column({ nullable: false, default: 'FREE!' })
  name: string;

  @Column({ nullable: false, default: 'free' })
  slug: string;

  @Column({ nullable: true })
  price: number;

  @Column({ type: "json", nullable: true })
  details: string;

  // our products and services
  @OneToMany(() => License, license => license.plan)
  licenses: License[];

  // license key
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
  // other // in app permissions
  @Column({ default: true })
  grantCollectionAccess: boolean
  @Column({ default: true })
  grantPlaylistAccess: boolean
  @Column({ default: true })
  grantBulletinBoardAccess: boolean
  @Column({ default: true })
  grantHostingAccess: boolean

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