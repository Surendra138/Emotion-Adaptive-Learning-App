import app from "./app.js";
import "./config/env.js";
import { connectDB } from "./config/db.js";

const PORT = process.env.PORT;

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log("Backend running on port " + PORT);
  });
};

startServer();