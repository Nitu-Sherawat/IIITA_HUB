import express from "express";
import multer from "multer";
import path from 'path';
import { getmyprofile, login, logout, register, updatemyprofile, uploadimg } from "../controller/student.js";
import mongoose from "mongoose";


const imgdest= path.join('C:','Users','Rohit Pandey','Desktop','IIITA HUB BACKEND');
const upload = multer({ dest: 'uploads/' });
const imageSchema = new mongoose.Schema({
    data: Buffer,
    contentType: String
});
export const Image = mongoose.model('Image', imageSchema);

const router= express.Router();



router.post('/new',register);
router.post('/login',login);
router.get('/logout',logout);
router.get('/me',getmyprofile);
router.post('/update',updatemyprofile);
router.post('/uploadimg', upload.single('image'), uploadimg);

router.get('/hello',(req,res)=>{
    res.send("Hello  World");
})
export default router;


