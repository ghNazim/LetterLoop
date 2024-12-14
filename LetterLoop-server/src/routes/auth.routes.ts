import express from "express";
import { handleAuthUrl, handleGoogleCallback } from "../controllers/auth.control";


const router = express.Router();

router.post("/url",handleAuthUrl)
router.get("/callback",handleGoogleCallback)
export default router