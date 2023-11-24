import {
    Entity,
    Column,
    BeforeInsert,
    PrimaryGeneratedColumn,
    OneToMany,
} from "typeorm";
import * as bcrypt from "bcryptjs";
import { Expense } from "./Expense";
import { Income } from "./Income";

@Entity("user")
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    first_name: string;

    @Column()
    last_name: string;

    @Column({ unique: true })
    email: string;

    @Column({})
    password: string;

    @OneToMany(() => Expense, (expense) => expense.user, {
        eager: true,
        cascade: true,
    })
    expenses: Expense[];

    @OneToMany(() => Income, (income) => income.user, { cascade: true })
    incomes: Income[];

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }
}
