import {
    getAllMembers, addMember,getMemberById,updateMember,deleteMember
} from "../controller/members.js";
import express from "express";

const router=express.Router();
router.get("/",getAllMembers)  
router.get("/:id", getMemberById)  
router.delete("/:id",deleteMember)  
router.post("/",addMember) 
router.put("/:id", updateMember) 

 
export default router;