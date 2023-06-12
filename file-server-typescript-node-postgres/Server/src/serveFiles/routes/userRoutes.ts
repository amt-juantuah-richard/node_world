import { Router } from "express";
import { checkAdminStatus } from '../mdw';
import { 
    createUser,
    getUsers, 
    getAUserByUsernameAndPassword,
    getAUserById,
    deleteAUserById,
    updateAUserUsername,
    updateAUserPassword,
    verifyOneUser
} from "../controller";


const router = Router();

router.get("/", checkAdminStatus, getUsers);
router.put("/verify", verifyOneUser);
router.post("/register", createUser);
router.post("/login", getAUserByUsernameAndPassword);
router.get("/:id", checkAdminStatus, getAUserById);
router.delete("/:id", checkAdminStatus, deleteAUserById);
router.put("/username", updateAUserUsername);
router.put("/password", updateAUserPassword);
// router.get()

export default router;
