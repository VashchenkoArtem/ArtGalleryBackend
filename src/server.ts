import express from "express";
import type { Express } from "express";


const app: Express = express();

const PORT = 3000;
const HOST = "localhost";

app.listen(PORT, HOST, () => {
    console.log("Server is running on http://" + HOST + ":" + PORT)
});