import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToOne, ManyToMany, JoinTable, OneToMany} from "typeorm";
import { UserEntity } from './user-entity';
import { AddressEntity } from './address-entity';
import { RatingEntity } from './rating-entity';

@Entity("service")
export class ServiceEntity {

    @PrimaryGeneratedColumn()
    prestation_id: number;

    @Column({default: false})
    canceled: boolean;

    @OneToMany(type => RatingEntity, rating => rating.service ,{ onDelete: 'CASCADE' })
    @JoinTable()
    ratings: RatingEntity[];

    @OneToOne(type => AddressEntity)
    @JoinColumn()
    address: AddressEntity;

    @ManyToMany(type => UserEntity, customer => customer.usedServices ,{ onDelete: 'CASCADE' })
    @JoinTable()
    customers: UserEntity[];

    @ManyToOne(type => UserEntity, customer => customer.providedServices ,{ onDelete: 'CASCADE' })
    provider: UserEntity;
}