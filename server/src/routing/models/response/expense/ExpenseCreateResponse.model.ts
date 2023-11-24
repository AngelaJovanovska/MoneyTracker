import { Expense } from "../../../../entities/Expense";
// import { UserResponseExpense } from "../user/UserResponse.model";

export class ExpenseCreateResponse {
    id: number;
    amount: Number;
    description: string;
    created_at: Date;
    type: string;
    // user: UserResponseExpense;
    // { [key: string]: any } === Record<string, any>
    constructor(expense: Expense) {
        this.id = expense.id;
        this.amount = expense.amount;
        this.description = expense.description;
        this.created_at = expense.created_at;
        this.type = expense.type;
        // this.user = new UserResponseExpense(expense.user);
    }
}
