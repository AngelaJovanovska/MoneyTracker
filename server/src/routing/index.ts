import express from "express";
import { expensesRouter } from "./routes/expense.router";
import { incomesRouter } from "./routes/income.router";
import { userRouter as usersRouter } from "./routes/user.router";

export const router = express.Router();

router.use(usersRouter);
router.use(expensesRouter);
router.use(incomesRouter);
