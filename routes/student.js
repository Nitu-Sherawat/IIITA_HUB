import express from "express";
import { getmyprofile, login, logout, register, updatemyprofile, notification, getAlumni, getProfileById } from "../controller/student.js";



const router= express.Router();



router.post('/new',register);
router.post('/login',login);
router.get('/logout',logout);
router.get('/me',getmyprofile);
router.get('/notification', notification);
router.post('/update',updatemyprofile);
router.get('/alumni', getAlumni); 
router.get('/profile/:id', getProfileById);

router.get('/hello',(req,res)=>{
    res.send("Hello  World");
})
export default router;


