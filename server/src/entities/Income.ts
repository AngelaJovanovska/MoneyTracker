import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
    ManyToOne,
} from "typeorm";
import { User } from "./User";

export enum IncomeCategory {
    Earned = "earned",
    Passive = "passive",
    Portfolio = "portfolio",
}
@Entity()
export class Income {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    amount: number;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    created_at: Date;

    @Column()
    description: string;

    @ManyToOne(() => User, (user) => user.incomes)
    user: User;

    @Column({
        type: "enum",
        enum: IncomeCategory,
        default: IncomeCategory.Earned,
    })
    type: string;
}
