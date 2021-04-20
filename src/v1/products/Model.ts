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
import Category from '../categories/Model'
import Collection from '../collections/Model'
import Cart from '../carts/Model'
import Order from '../orders/Model'
import Plan from '../plans/Model'

export enum ActionTypes {
  SUBSCRIBE_TO_PLAN = "SUBSCRIBE_TO_PLAN",
  SHIP_TO_LOCATION = "SHIP_TO_LOCATION",
  DO_NOTHING = "DO_NOTHING",
}

@Entity()
@Unique(["app", "slug"])
export default class Product extends BaseEntity {
    
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "uuid", nullable: false })
  appId: string;

  @ManyToOne(() => App, app => app.users)
  @JoinColumn({ name: "appId" })
  app: App;

  @Column()
  name: string;

  @Column()
  slug: string;

  @Column({ type: "uuid", nullable: true })
  categoryId: string;

  @ManyToOne(() => Category, category => category.products)
  @JoinColumn({ name: "categoryId" })
  category: Category;

  @ManyToMany(() => Collection, collection => collection.products)
  @JoinTable()
  collections: Collection[];

  @ManyToMany(() => Cart, cart => cart.products)
  @JoinTable()
  carts: Cart[];

  @ManyToMany(() => Order, order => order.products)
  @JoinTable()
  orders: Order[];

  // after purchase of product this action type will be called
  @Column({
    type:"enum", 
    enum: ActionTypes, 
    array: true, 
    default: [ActionTypes.DO_NOTHING]
  })
  actionType: ActionTypes

  // action types: subscribe to plan
  @Column({ type: "uuid", nullable: true })
  subscribeToPlanId: string;

  @OneToOne(() => Product)
  @JoinColumn({ name: "subscribeToPlanId" })
  subscribeToPlan: Plan;
  
  // action types: ship to location
  // action types: do nothing
  
  @Column({ nullable: true })
  image: string;

  @Column({ nullable: true })
  price: number;

  @Column({ nullable: true })
  details: string;

  @Column({ nullable: true })
  description: string;

  @Column({ default: false })
  isPublished: boolean;

  @Column({ default: false })
  isNotForSale: boolean;

  @Column({ nullable: true })
  stockKeepingUnit: string;
  @Column({ default: 1 })
  inStockCount: number;

  @Column({ nullable: true })
  url: string;

  @Column({ type: 'json', nullable: true })
  gallery: string;

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