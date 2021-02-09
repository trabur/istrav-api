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

import { Length, IsNotEmpty } from "class-validator"

@Entity()
@Unique(["domain", "state"])
export default class App extends BaseEntity {
    
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    @Length(4, 20)
    @Index({ unique: true })
    demo: string;

    @Column({ type: "uuid", nullable: false })
    ownerId: string;

    @ManyToOne(() => Member, member => member.apps)
    @JoinColumn({ name: "ownerId" })
    owner: Member;

    @OneToMany(() => User, user => user.app)
    users: User[];

    @OneToMany(() => Vehicle, vehicle => vehicle.app)
    vehicles: Vehicle[];

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
