import express from "express";
import ds from "../../db";
import { Expense } from "../../entities/Expense";
import { User } from "../../entities/User";
import { UserNotFoundException } from "../../exceptions";
import { ExpenseCreateRequest } from "../models/request/expense/ExpenseCreateRequest.model";
import { ExpenseCreateResponse } from "../models/response/expense/ExpenseCreateResponse.model";
import { RequestWithUserId } from "../../middlewares/types";
// import { UserCreateResponse } from "./models/response/UserCreateResponse.model";

const expenseRouter = express.Router();
const expenseRepository = ds.getRepository(Expense);
const userRepository = ds.getRepository(User);
//create expenses
expenseRouter.post("/expenses", async (req, res) => {
    const userId = (req as RequestWithUserId).userId;
    const expenseCreateModel = new ExpenseCreateRequest(req.body);

    const user = await userRepository.findOne({ where: { id: userId } });

    if (!user) {
        return res.json(new UserNotFoundException());
    }
    const expense = expenseCreateModel.createExpense();
    expense.user = user;
    try {
        await expenseRepository.save(expense);
        const payload = new ExpenseCreateResponse(expense);
        return res.status(201).json(payload);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: "db error" });
    }
});
// const user_e = await ds
//     .getRepository(User)
//     .createQueryBuilder("user")
//     .leftJoinAndSelect("user.expenses", "expense")
//     .where("user.id = :userId", { userId: userIntId })
//     // .andWhere("expense.id = :expenseId", { expenseId: expenseIntId })
//     .getMany();
//get all expenses
expenseRouter.get("/expenses", async (req, res) => {
    const userId = (req as RequestWithUserId).userId;

    const user = await userRepository.findOne({ where: { id: userId } });
    if (!user) {
        return res.json(new UserNotFoundException());
    }
    try {
        const expense = await ds
            .getRepository(Expense)
            .createQueryBuilder("expense")
            .innerJoin("expense.user", "user")
            .where("user.id = :userId", { userId: userId })
            .getMany();

        if (expense.length == 0) {
            return res
                .status(404)
                .json({ msg: "this user has not created any expense yet" });
        }
        return res.status(200).json(expense);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: "db error" });
    }
});
//get single expenses
expenseRouter.get("/expenses/:expense_id", async (req, res) => {
    const userId = (req as RequestWithUserId<{ expense_id: string }>).userId;

    const { expense_id } = req.params;
    const expenseIntId = parseInt(expense_id, 10);

    try {
        const user = await userRepository.findOne({ where: { id: userId } });
        // console.log(user);
        if (!user) {
            return res.json(new UserNotFoundException());
        }

        const expense = await ds
            .getRepository(Expense)
            .createQueryBuilder("expense")
            .innerJoin("expense.user", "user")
            .where("user.id = :userId", { userId: userId })
            .andWhere("expense.id = :expenseId", { expenseId: expenseIntId })
            .getOne();
        // console.log(expense);

        if (!expense) {
            return res.status(404).json({ msg: "expense not found" });
        }
        return res.status(200).json(expense);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: "db error" });
    }
});
//edit expense
expenseRouter.put("/expenses/:expense_id", async (req, res) => {
    const userId = (req as RequestWithUserId<{ expense_id: string }>).userId;

    const { expense_id } = req.params;
    const expenseIntId = parseInt(expense_id, 10);

    const expenseCreateModel = new ExpenseCreateRequest(req.body);

    const expense = expenseCreateModel.createExpense();
    const user = await userRepository.findOne({
        where: { id: userId },
    });
    // console.log(user);
    if (!user) {
        return res.json(new UserNotFoundException());
    }

    try {
        await expenseRepository
            .createQueryBuilder()
            .update(Expense)
            .set({
                amount: expense.amount,
                description: expense.description,
                type: expense.type,
            })
            .where("expense.id= :expenseId", { expenseId: expenseIntId })
            .execute();

        return res.status(200).json({ msg: "updated" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: "db error" });
    }
});
export { expenseRouter as expensesRouter };
