import { Income } from "../../../../entities/Income";

export class IncomeCreateResponse {
    id: number;
    amount: Number;
    description: string;
    created_at: Date;
    type: string;

    constructor(income: Income) {
        this.id = income.id;
        this.amount = income.amount;
        this.description = income.description;
        this.created_at = income.created_at;
        this.type = income.type;
    }
}
