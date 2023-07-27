import express from "express";
import { login } from "../controllers/auth.js";

const router = express.Router();

// USAGE
// app.use("/auth", authRoutes);

router.post("/login", login);

export default router;
