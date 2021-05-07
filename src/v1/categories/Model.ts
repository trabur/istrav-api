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
  OneToMany
} from "typeorm"

import App from '../apps/Model'
import Product from '../products/Model'
import Block from '../blocks/Model'

@Entity()
@Unique(["app", "slug"])
export default class Category extends BaseEntity {
  // unique
  @PrimaryGeneratedColumn("uuid")
  id: string;

  // multi-tenant SaaS
  @Column({ type: "uuid", nullable: false })
  appId: string;

  @ManyToOne(() => App, app => app.categories)
  @JoinColumn({ name: "appId" })
  app: App;

  // front-page landing
  @OneToMany(() => Block, block => block.category)
  pageBlocks: Block[];

  // relations
  @OneToMany(() => Product, product => product.category)
  products: Product[];

  // display
  @Column()
  name: string;

  // identification
  @Column()
  slug: string;

  // 
  @Column({ nullable: true })
  image: string;

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