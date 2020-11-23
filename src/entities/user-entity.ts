import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, Unique } from "typeorm";
import * as bcrypt from "bcryptjs";

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
        length: 30
    })
    password: string;

    @Column()
    role: UserRole;

    @BeforeInsert()
    async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
    }

    checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
        return bcrypt.compareSync(unencryptedPassword, this.password);
    }
}