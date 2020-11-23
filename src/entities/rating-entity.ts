import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinTable} from "typeorm";
import { UserEntity } from './user-entity';
import { ServiceEntity } from './service-entity';

@Entity("rating")
export class RatingEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    category: String;

    @Column()
    rating: Number;

    @ManyToOne(type => UserEntity, customer => customer.ratings ,{ onDelete: 'CASCADE' })
    @JoinTable()
    customer: UserEntity;

    @ManyToOne(type => ServiceEntity, service => service.ratings ,{ onDelete: 'CASCADE' })
    service: ServiceEntity;
}