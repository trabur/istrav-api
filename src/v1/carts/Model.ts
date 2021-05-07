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
  JoinTable,
  OneToOne
} from "typeorm"
import { Length, IsNotEmpty } from "class-validator"

import App from '../apps/Model'
import User from '../users/Model'
import Product from '../products/Model'

@Entity()
@Unique(["app", "user"])
export default class Cart extends BaseEntity {
  // uniquq
  @PrimaryGeneratedColumn("uuid")
  id: string;

  // multi-tenant SaaS
  @Column({ type: "uuid", nullable: false })
  appId: string;

  @ManyToOne(() => App, app => app.users)
  @JoinColumn({ name: "appId" })
  app: App;

  // identification
  @Column({ type: "uuid", nullable: true })
  userId: string;

  @OneToOne(() => User)
  @JoinColumn({ name: "userId" })
  user: User;

  // relations
  @ManyToMany(() => Product, product => product.carts)
  products: Product[];

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