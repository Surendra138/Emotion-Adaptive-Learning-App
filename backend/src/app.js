import express, { Router } from "express";
import cors from "cors";
import router from "./routes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", router);

app.get('/health', (req, res) => {
    res.json({ status: "backend is running!" });
});

export default app;