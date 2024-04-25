import express from "express";
import{ login,register,getmyprofile, logout, updatemyprofile, homepage} from "../controller/admin.js"
import { isAuthenticated2 } from "../middlewares/auth.js";

const router= express.Router();

router.post('/new',register);
router.post('/login',login);
router.get('/logout',logout);
router.get('/me',getmyprofile);
router.post('/update',updatemyprofile)
router.get('/homepage',homepage);
router.get('/hello',(req,res)=>{
    res.send("Hello World");
})
export default router;


