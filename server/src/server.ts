import express from "express";
import ds from "./db";
import { router } from "./routing";
import { auth } from "./routing/routes/auth.router";
import { authenticate } from "./middlewares";
import cors from "cors";
const app = express();

const main = async () => {
    try {
        await ds.initialize();
        if (ds.isInitialized) {
            console.log("Connected to Postgres");
            app.use(cors());
            app.use(express.json());
            app.use("/auth", auth);
            app.use("/api", authenticate, router);
            app.listen(8083, () => {
                console.log("Now running on port 8083");
            });
        }
    } catch (error) {
        console.error(error);
        throw new Error("Unable to connect to db");
    }
};
main();
