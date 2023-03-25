import { Router } from "express";
import { getUsers } from "../controller";
import { checkAdminStatus } from '../mdw';

const router = Router();

router.get("/", checkAdminStatus, getUsers);

export default router;