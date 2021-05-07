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
  OneToMany,
  OneToOne
} from "typeorm"
import { Length, IsNotEmpty } from "class-validator"

import App from '../apps/Model'
import Cart from '../carts/Model'
import Order from '../orders/Model'
import Video from '../videos/Model'
import Block from '../blocks/Model'

@Entity()
@Unique(["app", "email"])
@Unique(["app", "username"])
@Unique(["app", "firstName", "lastName"])
export default class User extends BaseEntity {
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
  @OneToMany(() => Block, block => block.user)
  pageBlocks: Block[];

  @Column({ type: "uuid", nullable: true })
  cartId: string;

  @OneToOne(() => Cart)
  @JoinColumn({ name: "cartId" })
  cart: Cart;

  @OneToMany(() => Order, order => order.user)
  orders: Order[];

  @OneToMany(() => Video, video => video.contentCreator)
  videos: Video[];
  
  @Column({ nullable: true })
  image: string;

  @Column()
  email: string;

  @Column()
  @Length(4, 20)
  username: string;

  @Column()
  @Length(4, 100)
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

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
  
  static findByName(firstName: string, lastName: string) {
    return this.createQueryBuilder("user")
      .where("user.firstName = :firstName", { firstName })
      .andWhere("user.lastName = :lastName", { lastName })
      .getMany();
  }
}