import { DataSourceOptions, DataSource } from "typeorm";
import { Expense } from "./entities/Expense";
import { Income } from "./entities/Income";
import { User } from "./entities/User";
import dotenv from "dotenv";

import {
    DATABASE_HOST,
    DATABASE_PASSWORD,
    DATABASE_PORT,
    DATABASE_USERNAME,
    DATABASE_NAME,
} from "./config/env-variables";

dotenv.config();

const dso: DataSourceOptions = {
    type: "postgres",
    host: DATABASE_HOST,
    port: DATABASE_PORT,
    username: DATABASE_USERNAME,
    password: DATABASE_PASSWORD,
    database: DATABASE_NAME,
    entities: [User, Expense, Income],
    synchronize: true,
};
// const AppDataSource = new DataSource(dso);

export default new DataSource(dso);
