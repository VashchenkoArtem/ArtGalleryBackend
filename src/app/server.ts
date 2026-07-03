import express from "express";
import type { Express } from "express";
import { AppRouter } from "./routes";
import { errorMiddleware } from "../middlewares";
import cookieParser from "cookie-parser";


const app: Express = express();

const PORT = 3000;
const HOST = "localhost";

app.use(express.json());
app.use(cookieParser());

app.use(AppRouter);
app.use(errorMiddleware);

app.listen(PORT, HOST, () => {
    console.log("Server is running on http://" + HOST + ":" + PORT)
});