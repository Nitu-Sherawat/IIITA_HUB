import { Admin } from "../models/admin.js";
import { Student } from "../models/student.js";
import jwt from "jsonwebtoken";
export const isAuthenticated1= async(req,res,next)=>{
    const { token }=req.cookies;
    if(!token)
    return res.status(404).json({
        success: false,
        message:"Login First",
    });
    const decoded= jwt.verify(token,process.env.JWT_SECRET);
    req.user= await Student.findById(decoded._id);
    next();
};
export const isAuthenticated2= async(req,res,next)=>{
    const { token }=req.cookies;
    if(!token)
    return res.status(404).json({
        success: false,
        message:"Login First",
    });
    const decoded= jwt.verify(token,process.env.JWT_SECRET);
    req.user= await Admin.findById(decoded._id);
    next();
};