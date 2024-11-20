import express from "express";
import { Income } from "../../entities/Income";
import { User } from "../../entities/User";
import ds from "../../db";
import { UserNotFoundException } from "../../exceptions";
import { IncomeCreateRequest } from "../models/request/income/IncomeCreateRequest.model";
import { IncomeCreateResponse } from "../models/response/income/IncomeCreateResponse.model";
import { RequestWithUserId } from "../../middlewares/types";

const incomeRouter = express.Router();
const incomeRepository = ds.getRepository(Income);
const userRepository = ds.getRepository(User);

incomeRouter.post("/incomes", async (req, res) => {
    const userId = (req as RequestWithUserId).userId;
    const incomeCreateModel = new IncomeCreateRequest(req.body);

    const user = await userRepository.findOne({ where: { id: userId } });

    if (!user) {
        return res.json(new UserNotFoundException());
    }

    const income = incomeCreateModel.createIncome();
    income.user = user;

    try {
        await incomeRepository.save(income);
        const payload = new IncomeCreateResponse(income);
        return res.status(201).json(payload);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: "db error" });
    }
});

incomeRouter.get("/incomes", async (req, res) => {
    const userId = (req as RequestWithUserId).userId;

    const user = await userRepository.findOne({ where: { id: userId } });

    if (!user) {
        return res.json(new UserNotFoundException());
    }
    try {
        const income = await ds
            .getRepository(Income)
            .createQueryBuilder("income")
            .innerJoin("income.user", "user")
            .where("user.id = :userId", { userId: userId })
            .getMany();

        if (income.length == 0) {
            return res
                .status(404)
                .json({ msg: "this user has not created any income yet" });
        }
        return res.json(income);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: "db error" });
    }
});

incomeRouter.get("/incomes/:income_id", async (req, res) => {
    const userId = (req as RequestWithUserId<{ income_id: string }>).userId;

    const { income_id } = req.params;
    const incomeIntId = parseInt(income_id, 10);

    try {
        const user = await userRepository.findOne({ where: { id: userId } });

        if (!user) {
            return res.json(new UserNotFoundException());
        }

        const income = await ds
            .getRepository(Income)
            .createQueryBuilder("income")
            .innerJoin("income.user", "user")
            .where("user.id = :userId", { userId: userId })
            .andWhere("income.id = :incomeId", { incomeId: incomeIntId })
            .getOne();
        // console.log(income);

        if (!income) {
            return res.status(404).json({ msg: "income not found" });
        }
        return res.status(200).json(income);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: "db error" });
    }
});

incomeRouter.put("/users/:user_id/incomes/:income_id", async (req, res) => {
    const { user_id, income_id } = req.params;
    const userIntId = parseInt(user_id, 10);
    const incomeIntId = parseInt(income_id, 10);

    const incomeCreateModel = new IncomeCreateRequest(req.body);

    const income = incomeCreateModel.createIncome();
    const user = await userRepository.findOne({
        where: { id: userIntId },
    });
    // console.log(user);
    if (!user) {
        return res.json(new UserNotFoundException());
    }

    try {
        await incomeRepository
            .createQueryBuilder()
            .update(Income)
            .set({
                amount: income.amount,
                description: income.description,
                type: income.type,
            })
            .where("income.id= :incomeId", { incomeId: incomeIntId })
            .execute();

        return res.status(200).json({ msg: "updated" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: "db error" });
    }
});

incomeRouter.delete("/incomes/:income_id", async (req, res) => {
    const userId = (req as RequestWithUserId<{ income_id: string }>).userId;

    const { income_id } = req.params;
    const incomeIntId = parseInt(income_id, 10);

    const user = await userRepository.findOne({
        where: { id: userId },
    });
    // console.log(user);
    if (!user) {
        return res.json(new UserNotFoundException());
    }
    const income = await ds
        .getRepository(Income)
        .createQueryBuilder("income")
        .innerJoin("income.user", "user")
        .where("user.id = :userId", { userId: userId })
        .andWhere("income.id = :incomeId", { incomeId: incomeIntId })
        .getOne();
    try {
        if (!income) {
            return res
                .status(204)
                .json({ msg: "income not found with that id" });
        } else {
            incomeRepository.delete(income.id);
            return res.status(200).json({ msg: "income deleted" });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: "db error" });
    }
});
export { incomeRouter as incomesRouter };
