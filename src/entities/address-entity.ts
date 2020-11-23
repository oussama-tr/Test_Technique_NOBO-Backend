import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("adress")
export class AddressEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 30
    })
    street: string;

    @Column({})
    zipcode: number;

    @Column({
        length: 30
    })
    city: string;

    @Column({
        length: 30
    })
    country: string;
}