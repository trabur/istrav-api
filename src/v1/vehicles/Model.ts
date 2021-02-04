import { 
    BaseEntity,
    Entity, 
    PrimaryGeneratedColumn, 
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    VersionColumn,
    Unique,
    ManyToOne
} from "typeorm";

import App from '../apps/Model'

@Entity()
@Unique(["app", "name"])
export default class Vehicle extends BaseEntity {
    
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => App, app => app.users)
    @JoinColumn({ name: "appId" })
    app: App;

    @Column()
    name: string;

    @Column()
    lat: string;

    @Column()
    long: string;

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
