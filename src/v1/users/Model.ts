import {
  BaseEntity,
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn
} from "typeorm"
import { Length, IsNotEmpty } from "class-validator"
import sha512 from 'crypto-js/sha512'

@Entity()
export default class User extends BaseEntity {
    
  @PrimaryColumn({ type:"uuid" })
  id: string;
  
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

  @Column()
  @IsNotEmpty()
  role: string;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  static findByName(firstName: string, lastName: string) {
    return this.createQueryBuilder("user")
      .where("user.firstName = :firstName", { firstName })
      .andWhere("user.lastName = :lastName", { lastName })
      .getMany();
  }

  hashPassword() {
    // convert password to hash
    this.password = sha512(this.password).toString()
  }

  checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
    let up = sha512(unencryptedPassword).toString()
    if (up === this.password) {
      return true
    } else {
      return false
    }
  }
}