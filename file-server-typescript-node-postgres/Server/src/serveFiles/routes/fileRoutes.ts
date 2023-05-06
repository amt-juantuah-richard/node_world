import { Router } from "express";
import { 
    getFiles, 
    getPrivateFilesForOneUser, 
    uploadFile,
    uploadOnePublicFile,
    downloadFile,
    sendFileAsMail,
    getPublicFiles
} from "../controller";
import { 
    checkAdminStatus, 
    checkUserStatus, 
    upLoadOneFile
} from '../mdw';


const router = Router();
// TODO implement route for admin to load public files
router.get("/", checkAdminStatus, getFiles);
router.get("/:id/:email", checkUserStatus, getPrivateFilesForOneUser);
router.get("/public/:id/:email", checkUserStatus, getPublicFiles);
router.post("/upload/:id", checkUserStatus, upLoadOneFile, uploadFile);
router.post("/upload/admin/:id", checkAdminStatus, upLoadOneFile, uploadOnePublicFile);
router.post("/download", downloadFile);
router.post("/mailer", sendFileAsMail);

export default router;