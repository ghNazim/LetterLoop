import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRouters from "./routes/auth.routes"
// Load environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 3300;

app.use(cors());

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, world!");
});
app.use("/oauth/google",authRouters)
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
