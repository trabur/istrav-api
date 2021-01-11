import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export default class VehicleEvent extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    eventData: string;

    @Column()
    createdAt: Date;

}