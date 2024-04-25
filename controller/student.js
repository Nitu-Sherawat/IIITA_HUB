import { Student} from "../models/student.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/feature.js";
import jwt from "jsonwebtoken";
import { Image } from "../routes/student.js";
import fs from 'fs';

export const register = async (req, res) => {
    const { name, email, password, mobile,enrollment_no,batch } = req.body;

    try {
        let student = await Student.findOne({ email });

        if (student) {
            return res.status(400).json({
                success: false,
                message: "User already exists",
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        student = await Student.create({ name, email, password: hashedPassword, mobile,enrollment_no,batch });

        sendCookie(student, res, "Registered Successfully", 201);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};

export const login = async (req, res, next) => {
    const { email, password } = req.body;
    const student = await Student.findOne({ email }).select("+password");
    if (!student) {
        return res.status(404).json({
            success: false,
            message: "Invalid Email id or Password",
        });
    }
    const username = student.name;

    bcrypt.compare(password, student.password, (err, isMatch) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Server error",
            });
        }

        if (!isMatch) {
            return res.status(404).json({
                success: false,
                message: "Invalid Email or Password",
            });
        }
        sendCookie(student, res, "Welcome back, " + username, 200);
    });
};

export const getmyprofile = async (req,res)=>{
    const { token }=req.cookies;

    if(!token)
    return res.status(404).json({
        success: false,
        message:"Login First",
    });

    const decoded= jwt.verify(token,process.env.JWT_SECRET);
    const student= await Student.findById(decoded._id);

    res.status(200).json({
        success:true,
        student,
    })
};

export const logout = async (req,res)=>{
    res
    .status(200)
    .cookie("token","",{
        expires:new Date(Date.now()) ,
        sameSite: process.env.NODE_ENV==="Development" ? "lax" :"none",
        secure: process.env.NODE_ENV==="Development" ? false :true,
    })
    .json({
        success:true,
        message: "You are Logged Out",
    })
};


export const updatemyprofile=async(req,res)=>{
    const { _id, name, email, password, mobile , enrollment_no , batch} = req.body;
    try {
        let student = await Student.findOneAndUpdate({ email }, { $set: { name, password, mobile, batch, enrollment_no } });

        if (student) {
            return res.status(200).json({
                success: true,
                message: "Profile Updated Successfully",
            });
        } else {
            return res.status(404).json({
                success: false,
                message: "User does not exist",
            });
        }
    }catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};

export const homepage=async(req,res)=>{

};


export const uploadimg=async(req,res)=>{
    try {
        if (!req.file) {
            return res.status(400).send('No file uploaded.');
        }
        
        const image = new Image({
            data: fs.readFileSync(req.file.path),
            contentType: req.file.mimetype,
            enrollment_no:req.data.enrollment_no,
        });
        await image.save();
        res.status(201).send('Image uploaded successfully!');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};