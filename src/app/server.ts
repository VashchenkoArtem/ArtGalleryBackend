import express from "express";
import type { Express } from "express";
import { AppRouter } from "./routes";
import { errorMiddleware } from "../middlewares";
import cookieParser from "cookie-parser";
import { ENV } from "../config/env";


const app: Express = express();



app.use(express.json());
app.use(cookieParser());

app.use(AppRouter);
app.use(errorMiddleware);

app.listen(ENV.PORT, ENV.HOST, () => {
    console.log("Server is running on http://" + ENV.HOST + ":" + ENV.PORT)
});