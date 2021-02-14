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

    @Column({ type: "json", nullable: true })
    raw: string;

    @Column()
    domain: string;

    @Column()
    state: string;

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
