import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { User } from "./User";

export enum ExpenseCategory {
    Fixed = "fixed",
    Variable = "variable",
    Intermittent = "intermittent",
    Discretionary = "discretionary",
}

@Entity()
export class Expense {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    amount: number;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    created_at: Date;

    @Column()
    description: string;

    @ManyToOne(() => User, (user) => user.expenses)
    user: User;

    @Column({
        type: "enum",
        enum: ExpenseCategory,
        default: ExpenseCategory.Discretionary,
    })
    type: string;
}
