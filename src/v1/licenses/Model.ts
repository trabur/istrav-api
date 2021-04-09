import {
  BaseEntity,
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  DeleteDateColumn,
  VersionColumn,
  ManyToOne,
  Unique,
  JoinColumn,
  OneToOne
} from "typeorm"

import App from '../apps/Model'
import Plan from '../plans/Model'

@Entity()
@Unique(["key"])
export default class License extends BaseEntity {
    
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "uuid", nullable: false })
  appId: string;

  @ManyToOne(() => App, app => app.licenses)
  @JoinColumn({ name: "appId" })
  app: App;

  // value to get copy/pasted around
  @Column({ nullable: false })
  key: string;

  // istrav
  @Column({ type: "uuid", nullable: true })
  registerId: string;
  @OneToOne(() => App)
  @JoinColumn({ name: "registerId" })
  register: App;

  // our products and services
  @Column({ type: "uuid", nullable: true })
  planId: string;

  @ManyToOne(() => Plan, plan => plan.licenses)
  @JoinColumn({ name: "planId" })
  plan: Plan;

  // customize
  @Column({ type: "json", nullable: true })
  raw: string;
  
  // details
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