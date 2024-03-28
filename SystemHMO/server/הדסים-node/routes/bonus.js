import {
     getNumUsersSickThisMonth,getNumMembersNoVaccine
} from "../controller/bonus.js";
import express from "express";

const router=express.Router();
router.get("/getNumUsersSickThisMonth",getNumUsersSickThisMonth)  
router.get("/getNumMembersNoVaccine",getNumMembersNoVaccine)  


 
export default router;