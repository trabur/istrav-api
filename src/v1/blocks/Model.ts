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
  JoinColumn
} from "typeorm"

import App from '../apps/Model'
import Category from '../categories/Model'
import Collection from '../collections/Model'
import Product from '../products/Model'
import Menu from '../menus/Model'
import Video from '../videos/Model'
import Guide from '../guides/Model'
import Playlist from '../playlists/Model'
import Plan from '../plans/Model'
import FAQ from '../faq/Model'
import User from '../users/Model'
import Page from '../pages/Model'

@Entity()
@Unique(["app", "slug"])
export default class Block extends BaseEntity {
  // unique
  @PrimaryGeneratedColumn("uuid")
  id: string;

  // multi-tenant SaaS
  @Column({ type: "uuid", nullable: false })
  appId: string;

  @ManyToOne(() => App, app => app.blocks)
  @JoinColumn({ name: "appId" })
  app: App;

  // display
  @Column()
  name: string;

  // identification
  @Column()
  slug: string;

  // extra
  @Column({ type: "json", nullable: true })
  raw: string;

  // type: logo, header1, header2, header3, content, subscribe, footer1, footer2, etc...
  @Column()
  type: string;

  // relations
  @Column({ type: "uuid", nullable: true })
  applicationId: string;
  @ManyToOne(() => App, application => application.pageBlocks)
  @JoinColumn({ name: "applicationId" })
  application: App;

  @Column({ type: "uuid", nullable: true })
  categoryId: string;
  @ManyToOne(() => Category, category => category.pageBlocks)
  @JoinColumn({ name: "categoryId" })
  category: Category;

  @Column({ type: "uuid", nullable: true })
  collectionId: string;
  @ManyToOne(() => Collection, collection => collection.pageBlocks)
  @JoinColumn({ name: "collectionId" })
  collection: Collection;

  @Column({ type: "uuid", nullable: true })
  productId: string;
  @ManyToOne(() => Product, product => product.pageBlocks)
  @JoinColumn({ name: "productId" })
  product: Product;

  @Column({ type: "uuid", nullable: true })
  menuId: string;
  @ManyToOne(() => Menu, menu => menu.pageBlocks)
  @JoinColumn({ name: "menuId" })
  menu: Menu;

  @Column({ type: "uuid", nullable: true })
  videoId: string;
  @ManyToOne(() => Video, video => video.pageBlocks)
  @JoinColumn({ name: "videoId" })
  video: Video;

  @Column({ type: "uuid", nullable: true })
  guideId: string;
  @ManyToOne(() => Guide, guide => guide.pageBlocks)
  @JoinColumn({ name: "guideId" })
  guide: Video;

  @Column({ type: "uuid", nullable: true })
  playlistId: string;
  @ManyToOne(() => Playlist, playlist => playlist.pageBlocks)
  @JoinColumn({ name: "playlistId" })
  playlist: Video;

  @Column({ type: "uuid", nullable: true })
  planId: string;
  @ManyToOne(() => Plan, plan => plan.pageBlocks)
  @JoinColumn({ name: "planId" })
  plan: Plan;

  @Column({ type: "uuid", nullable: true })
  faqId: string;
  @ManyToOne(() => FAQ, faq => faq.pageBlocks)
  @JoinColumn({ name: "faqId" })
  faq: FAQ;

  @Column({ type: "uuid", nullable: true })
  userId: string;
  @ManyToOne(() => User, user => user.pageBlocks)
  @JoinColumn({ name: "userId" })
  user: User;

  @Column({ type: "uuid", nullable: true })
  pageId: string;
  @ManyToOne(() => Page, page => page.pageBlocks)
  @JoinColumn({ name: "pageId" })
  page: Page;

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