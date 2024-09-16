import express from "express";
import { dbConnection } from "./database/dbConnection.js";
import jobRouter from "./routes/jobRouter.js";
import userRouter from "./routes/userRouter.js";
import applicationRouter from "./routes/applicationRouter.js";
import { config } from "dotenv";
import cors from "cors";
import { errorMiddleware } from "./middlewares/error.js";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { Job } from "./models/jobSchema.js";
import { User } from "./models/userSchema.js";
import { Application } from "./models/applicationSchema.js";


const app = express();
config({ path: "./config/config.env" });

app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    method: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
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
app.get('/api/v1/jobs/count', async (req, res) => {
  try {
    const totalJobs = await Job.countDocuments();
    res.status(200).json({ totalJobs });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching job count' });
  }
});
app.get('/api/v1/users/jobseekers/count', async (req, res) => {
  try {
    const totalJobSeekers = await User.countDocuments({ role: 'Job Seeker' });
    res.status(200).json({ totalJobSeekers });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching job seeker count' });
  }
});
app.get('/api/v1/users/employers/count', async (req, res) => {
  try {
    const totalEmployers = await User.countDocuments({ role: 'Employer' });
    res.status(200).json({ totalEmployers });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching employer count' });
  }
});
app.get('/api/v1/companies/count', async (req, res) => {
  try {
    // Count distinct company names
    const uniqueCompanies = await Job.distinct("company");
    const totalCompanies = uniqueCompanies.length;
    res.status(200).json({ totalCompanies });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching companies count' });
  }
});

dbConnection();

app.use(errorMiddleware);

export default app;
