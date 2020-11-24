import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, Unique, OneToMany } from "typeorm";
import * as bcrypt from "bcryptjs";
import { ServiceEntity } from './service-entity';
import { RatingEntity } from './rating-entity';

export enum UserRole {
    CUSTOMER = "customer",
    PROVIDER = "provider"
}

@Entity("user")
@Unique(["email"])
export class UserEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 20
    })
    firstname: string;

    @Column({
        length: 20
    })
    lastname: string;

    @Column('varchar', {
        length: 100
      })
    email: string;

    @Column({
        length: 100,
    })
    password: string;

    @Column()
    role: UserRole;

    @OneToMany(type => ServiceEntity, service => service.customer ,{ onDelete: 'CASCADE' })
    usedServices: ServiceEntity[];

    @OneToMany(type => ServiceEntity, service => service.provider ,{ onDelete: 'CASCADE' })
    providedServices: ServiceEntity[];

    @OneToMany(type => RatingEntity, rating => rating.customer ,{ onDelete: 'CASCADE' })
    ratings: RatingEntity[];

    @BeforeInsert()
    async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
    }

    checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
        return bcrypt.compareSync(unencryptedPassword, this.password);
    }
}