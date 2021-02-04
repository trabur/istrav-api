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
    Unique
} from "typeorm";

import Member from '../members/Model'
import User from '../users/Model'
import Vehicle from '../vehicles/Model'

@Entity()
@Unique(["domain", "state"])
export default class App extends BaseEntity {
    
    @PrimaryGeneratedColumn("uuid")
    id: string;

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
