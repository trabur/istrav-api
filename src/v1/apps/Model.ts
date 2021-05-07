import { 
    BaseEntity,
    Entity, 
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    DeleteDateColumn,
    VersionColumn,
    OneToMany,
    Unique,
    JoinColumn,
    Index,
    OneToOne
} from "typeorm";

import Member from '../members/Model'
import User from '../users/Model'
import Category from '../categories/Model'
import Collection from '../collections/Model'
import Product from '../products/Model'
import Menu from '../menus/Model'
import Block from '../blocks/Model'
import Page from '../pages/Model'
import FAQ from '../faq/Model'
import Cart from '../carts/Model'
import Order from '../orders/Model'
import License from '../licenses/Model'
import Plan from '../plans/Model'
import Video from '../videos/Model'
import Guide from '../guides/Model'
import Playlist from '../playlists/Model'

import { Length, IsNotEmpty } from "class-validator"

@Entity()
@Unique(["domain", "state"])
@Unique(["license"])
export default class App extends BaseEntity {
  // unique
  @PrimaryGeneratedColumn("uuid")
  id: string;

  // identification 1
  @Column()
  domain: string;

  @Column()
  state: string;

  // indentification 2
  @Column()
  @Length(4, 20)
  @Index({ unique: true })
  endpoint: string;

  // root
  @Column({ type: "uuid", nullable: false })
  ownerId: string;

  @ManyToOne(() => Member, member => member.apps)
  @JoinColumn({ name: "ownerId" })
  owner: Member;

  // multi-tenant SaaS
  @OneToMany(() => User, user => user.app)
  users: User[];

  @OneToMany(() => Category, category => category.app)
  categories: Category[];

  @OneToMany(() => Collection, collection => collection.app)
  collections: Collection[];

  @OneToMany(() => Product, product => product.app)
  products: Product[];

  @OneToMany(() => License, license => license.app)
  licenses: License[];

  @OneToMany(() => Plan, plan => plan.app)
  plans: Plan[];

  @OneToMany(() => Menu, menu => menu.app)
  menus: Menu[];

  @OneToMany(() => Block, block => block.app)
  blocks: Block[];

  @OneToMany(() => Page, page => page.app)
  pages: Page[];

  @OneToMany(() => FAQ, faq => faq.app)
  faq: FAQ[];

  @OneToMany(() => Cart, cart => cart.app)
  carts: Cart[];

  @OneToMany(() => Order, order => order.app)
  orders: Order[];

  @OneToMany(() => Video, video => video.app)
  videos: Video[];

  @OneToMany(() => Guide, guide => guide.app)
  guides: Guide[];

  @OneToMany(() => Playlist, playlist => playlist.app)
  playlists: Playlist[];

  // front-page landing
  @OneToMany(() => Block, block => block.application)
  pageBlocks: Block[];

  // primary page
  @Column({ type: "uuid", nullable: true })
  marketingId: string;
  @OneToOne(() => Page)
  @JoinColumn({ name: "marketingId" })
  marketing: Page;
  // primary collection
  @Column({ type: "uuid", nullable: true })
  shopId: string;
  @OneToOne(() => Collection)
  @JoinColumn({ name: "shopId" })
  shop: Collection;
  // primary playlist
  @Column({ type: "uuid", nullable: true })
  channelId: string;
  @OneToOne(() => Playlist)
  @JoinColumn({ name: "channelId" })
  channel: Playlist;

  // extra
  @Column({ type: "json", nullable: true })
  raw: string;

  @Column({ type: "json", nullable: true })
  brands: string;

  // cdn
  @Column({ nullable: true })
  uploads: string;

  // white label
  @Column({ nullable: true })
  logo: string;

  // theme
  @Column({ nullable: true })
  coverBackColor: string;
  @Column({ nullable: true })
  coverTextColor: string;
  @Column({ nullable: true })
  primaryBtnBackColor: string;
  @Column({ nullable: true })
  primaryBtnTextColor: string;
  @Column({ nullable: true })
  secondaryBtnBackColor: string;
  @Column({ nullable: true })
  secondaryBtnTextColor: string;

  // labels
  @Column({ nullable: true })
  labelName: string;
  @Column({ nullable: true })
  labelShort: string;
  @Column({ nullable: true })
  labelEmail: string;
  @Column({ nullable: true })
  labelAbout: string;
  @Column({ nullable: true })
  labelShipping: string;
  @Column({ nullable: true })
  labelSloganLine1: string;
  @Column({ nullable: true })
  labelSloganLine2: string;
  @Column({ nullable: true })
  labelWelcome: string;
  @Column({ nullable: true })
  labelLocal: string;
  @Column({ nullable: true })
  labelTollFree: string;
  @Column({ nullable: true })
  labelAddressLine1: string;
  @Column({ nullable: true })
  labelAddressLine2: string;
  @Column({ nullable: true })
  labelPrimaryOffering: string;

  // share
  @Column({ type: 'json', nullable: true })
  share: string;

  // email
  @Column({ nullable: true })
  mailgunPrivateApiKey: string;

  // comments
  @Column({ nullable: true })
  utterancRepoId: string;
  @Column({ nullable: true })
  disqusId: string;

  // chat
  @Column({ nullable: true })
  tawkToPropertyId: string;
  @Column({ nullable: true })
  tawkToChatId: string;

  // analytics
  @Column({ nullable: true })
  googleAnalyticsMeasurementId: string;

  // intro
  @Column({ nullable: true })
  image: string;
  @Column({ nullable: true })
  line1: string;
  @Column({ nullable: true })
  line2: string;
  @Column({ nullable: true })
  buttonName: string;
  @Column({ nullable: true })
  buttonUrl: string;

  // strip
  @Column({ default: false })
  isStripeTestData: boolean
  @Column({ nullable: true })
  stripePublishableKeyTest: string;
  @Column({ nullable: true })
  stripeSecretKeyTest: string;
  @Column({ nullable: true })
  stripePublishableKeyLive: string;
  @Column({ nullable: true })
  stripeSecretKeyLive: string;

  // istrav
  @Column({ type: "uuid", nullable: true })
  licenseId: string;
  @OneToOne(() => License)
  @JoinColumn({ name: "licenseId" })
  license: License;

  // value to get copy/pasted around
  @Column({ nullable: true })
  licenseKey: string;

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
