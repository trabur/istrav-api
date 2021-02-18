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
    Index
} from "typeorm";

import Member from '../members/Model'
import User from '../users/Model'
import Vehicle from '../vehicles/Model'
import Category from '../categories/Model'
import Collection from '../collections/Model'
import Product from '../products/Model'
import Menu from '../menus/Model'
import Page from '../pages/Model'
import Cart from '../carts/Model'
import Order from '../orders/Model'

import { Length, IsNotEmpty } from "class-validator"

@Entity()
@Unique(["domain", "state"])
export default class App extends BaseEntity {
    
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    @Length(4, 20)
    @Index({ unique: true })
    endpoint: string;

    @Column({ type: "uuid", nullable: false })
    ownerId: string;

    @ManyToOne(() => Member, member => member.apps)
    @JoinColumn({ name: "ownerId" })
    owner: Member;

    @OneToMany(() => User, user => user.app)
    users: User[];

    @OneToMany(() => Vehicle, vehicle => vehicle.app)
    vehicles: Vehicle[];

    @OneToMany(() => Category, category => category.app)
    categories: Category[];

    @OneToMany(() => Collection, collection => collection.app)
    collections: Collection[];

    @OneToMany(() => Product, product => product.app)
    products: Product[];

    @OneToMany(() => Menu, menu => menu.app)
    menus: Menu[];

    @OneToMany(() => Page, page => page.app)
    pages: Page[];

    @OneToMany(() => Cart, cart => cart.app)
    carts: Cart[];

    @OneToMany(() => Order, order => order.app)
    orders: Order[];

    @Column({ type: "json", nullable: true })
    raw: string;

    @Column()
    domain: string;

    @Column()
    state: string;

    @Column({ nullable: true })
    uploads: string;

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
