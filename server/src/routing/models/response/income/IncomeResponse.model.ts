import { Income } from "../../../../entities/Income";

export class IncomeResponse {
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
export function listIncomeResponse(income: Income[]): IncomeResponse[] {
    return income.map((income) => new IncomeResponse(income));
}
