import dotenv from "dotenv";
import express from "express";
import RouteNote from "./routes/routes.js";
import { connectDB } from "./config/db.js";
import cors from "cors";
import path from "path";

dotenv.config();
const port = process.env.PORT || 5001;
const app = express();

const __dirname = path.resolve();

connectDB();
app.use(express.json());

if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:5173",
    }),
  );
}
app.use("/api/notes", RouteNote);

if (process.env.NODE_MODE === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

app.listen(port, () => {
  console.log("http://127.0.0.1:5001");
});
