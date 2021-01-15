import {BaseEntity, Entity, PrimaryColumn, Column} from "typeorm";

@Entity()
export default class VehicleView extends BaseEntity {
    
    @PrimaryColumn({ type:"uuid" })
    id: string;

    @Column()
    name: string;

    @Column()
    lat: string;

    @Column()
    long: string;

    static findByName(firstName: string, lastName: string) {
        return this.createQueryBuilder("user")
            .where("user.firstName = :firstName", { firstName })
            .andWhere("user.lastName = :lastName", { lastName })
            .getMany();
    }

}
