import cors from "cors";
import express from "express";
import path from "node:path";

import readFileRouter from "./routes/readFileHandler";

const app = express();
const port = Number(process.env.PORT) || 3000;
const frontendDirectory = path.join(__dirname, "../frontend");

app.use(cors());
app.use(express.json());
app.use("/readFile", readFileRouter);
app.use(express.static(frontendDirectory));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
