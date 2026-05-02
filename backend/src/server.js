import dotenv from "dotenv";
import express from "express";
import RouteNote from "./routes/routes.js";
import { connectDB } from "./config/db.js";
import cors from "cors";

dotenv.config();
const port = process.env.PORT || 5001;
const app = express();
connectDB();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

app.use("/api/notes", RouteNote);

app.listen(port, () => {
  console.log("http://127.0.0.1:5001");
});
