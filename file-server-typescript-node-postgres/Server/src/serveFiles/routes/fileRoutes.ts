import { Router } from "express";
import { getFiles } from "../controller";

const router = Router();

router.get("/", getFiles);

export default router;