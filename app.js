import express from "express";
import { dbConnection } from "./database/dbConnection.js";
import jobRouter from "./routes/jobRoutes.js";
import userRouter from "./routes/userRoutes.js";
import applicationRouter from "./routes/applicationRoutes.js";
import dotenv from "dotenv";
import cors from "cors";
import { errorMiddleware } from "./middlewares/error.js";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import path from 'path'

const app = express();
const __dirname = path.resolve()
dotenv.config({ path: "./config/config.env" });

app.use(
  cors()
);


app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/job", jobRouter);
app.use("/api/v1/application", applicationRouter);
dbConnection();

app.use(express.static(path.join(__dirname,'/frontend/dist')))

app.get("*",(req,res)=>{
  res.sendFile(path.join(__dirname,'/frontend/dist/index.html'))
})

app.use(errorMiddleware);
export default app;
