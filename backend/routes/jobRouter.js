import express from "express";
import {
    getAllJobs,
    postJob,
    getMyJobs,
  } from "../controllers/jobController.js";
  import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.get("/getall", getAllJobs);
router.post("/post", isAuthenticated, postJob);
router.get("/getmyjobs", isAuthenticated, getMyJobs);

export default router;
