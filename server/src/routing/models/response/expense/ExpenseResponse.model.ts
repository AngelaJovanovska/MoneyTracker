import { Expense } from "../../../../entities/Expense";

export class ExpenseResponse {
    id: number;
    amount: Number;
    description: string;
    created_at: Date;
    type: string;

    constructor(expense: Expense) {
        this.id = expense.id;
        this.amount = expense.amount;
        this.description = expense.description;
        this.created_at = expense.created_at;
        this.type = expense.type;
    }
}
export function listExpenseResponse(expense: Expense[]): ExpenseResponse[] {
    return expense.map((expense) => new ExpenseResponse(expense));
}
