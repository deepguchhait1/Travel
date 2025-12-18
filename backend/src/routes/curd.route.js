import express from "express";
import { addData, deleteData, showData, showOneData, updateData } from "../controllers/curd.controllers.js";
import upload from "../middleware/multer.js";

const router = express.Router();

router.get("/", showData);
router.get("/:id", showOneData);
router.post("/",upload.single("pic"), addData);
router.put("/:id", updateData);
router.delete("/:id", deleteData);

export default router;
