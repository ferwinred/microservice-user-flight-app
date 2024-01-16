import { UserState } from "src/common/infraestructure/infraestructure/enum";
import { BaseEntity } from "../../../common/infraestructure/domain/entity/baseEntity";
import { Column, Entity } from "typeorm";

@Entity()
export class User extends BaseEntity {

    @Column({
        name: 'first_name',
    })
    firstName: string;

    @Column({
        name: 'last_name',
    })
    lastName: string;

    @Column()
    username: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({
        default: UserState.PENDING
    })
    state: string;
}