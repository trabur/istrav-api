import {BaseEntity, Entity, PrimaryColumn, Column} from "typeorm";

@Entity()
export default class Vehicle extends BaseEntity {
    
    @PrimaryColumn({ type:"uuid" })
    id: string;

    @Column()
    name: string;

    @Column()
    lat: string;

    @Column()
    long: string;

}
