import express from "express";
import type { Express } from "express";
import { AppRouter } from "./routes";


const app: Express = express();

const PORT = 3000;
const HOST = "localhost";

app.use(express.json());
app.use(AppRouter);

app.listen(PORT, HOST, () => {
    console.log("Server is running on http://" + HOST + ":" + PORT)
});