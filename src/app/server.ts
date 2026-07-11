import express from "express";
import type { Express } from "express";
import { AppRouter } from "./routes";
import { errorMiddleware } from "../middlewares";
import cookieParser from "cookie-parser";
import { ENV } from "../config/env";
import cors from "cors"

const app: Express = express();


app.use(
    cors({
        origin: [
            "http://localhost:5173",
            "http://192.168.0.104:5173",
        ],
        credentials: true,
    })
);
app.use(express.json());
app.use(cookieParser());

app.use(AppRouter);
app.use(errorMiddleware);

app.listen(ENV.PORT, "0.0.0.0", () => {
    console.log("Server is running on http://" + ENV.HOST + ":" + ENV.PORT)
});