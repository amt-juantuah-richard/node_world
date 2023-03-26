import { Router } from "express";
import { checkAdminStatus } from '../mdw';
import { 
    createUser,
    getUsers, 
    getAUserByUsernameAndPassword,
    getAUserById,
    deleteAUserById,
    updateAUserUsername,
    updateAUserPassword
} from "../controller";


const router = Router();

router.get("/", checkAdminStatus, getUsers);
router.post("/", createUser);
router.get("/:username/:password", getAUserByUsernameAndPassword);
router.get("/:id", checkAdminStatus, getAUserById);
router.delete("/:id", checkAdminStatus, deleteAUserById);
router.put("/username", updateAUserUsername);
router.put("/password", updateAUserPassword);

export default router;