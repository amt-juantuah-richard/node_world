import { Router } from "express";
import { getFiles } from "../controller";
import { checkAdminStatus } from '../mdw';


const router = Router();

router.get("/", checkAdminStatus, getFiles);

export default router;