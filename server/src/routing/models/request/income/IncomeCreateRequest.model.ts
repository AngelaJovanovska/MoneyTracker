import { Income } from "../../../../entities/Income";
import ds from "../../../../db";

const incomeRepository = ds.getRepository(Income);

export class IncomeCreateRequest {
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

    createIncome(): Income {
        return incomeRepository.create({
            created_at: this.created_at,
            description: this.description,
            amount: this.amount,
            type: this.type,
        });
    }
}
