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
import User from '../users/Model'
import Product from '../products/Model'

@Entity()
@Unique(["app", "user", "placedAt"])
export default class Order extends BaseEntity {
  // unique
  @PrimaryGeneratedColumn("uuid")
  id: string;

  // multi-tenant SaaS
  @Column({ type: "uuid", nullable: false })
  appId: string;

  @ManyToOne(() => App, app => app.users)
  @JoinColumn({ name: "appId" })
  app: App;

  @Column({ type: "uuid", nullable: true })
  userId: string;

  @ManyToOne(() => User, user => user.orders)
  @JoinColumn({ name: "userId" })
  user: User;

  @ManyToMany(() => Product, product => product.orders)
  products: Product[];

  // extra
  @Column({ type: "json", nullable: true })
  raw: string;
  
  @Column()
  @CreateDateColumn()
  placedAt: Date;

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