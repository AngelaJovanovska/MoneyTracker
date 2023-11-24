import { Expense } from "../../../../entities/Expense";
import ds from "../../../../db";

const expenseRepository = ds.getRepository(Expense);

export class ExpenseCreateRequest {
    amount: number;
    created_at: Date;
    description: string;
    type: string;

    constructor(obj: Record<string, any>) {
        this.amount = obj.amount;
        this.created_at = obj.created_at;
        this.description = obj.description;
        this.type = obj.type;
    }

    createExpense(): Expense {
        return expenseRepository.create({
            created_at: this.created_at,
            description: this.description,
            amount: this.amount,
            type: this.type,
        });
    }
}
