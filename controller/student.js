import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Student } from "../models/student.js";
import { sendCookie } from "../utils/feature.js";

export const register = async (req, res) => {
    const { name, email, password, mobile,isAlumni,batchYear, degree ,resumeLink, photo} = req.body;

    try {
        let student = await Student.findOne({ email });

        if (student) {
            return res.status(400).json({
                success: false,
                message: "User already exists",
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        student = await Student.create({ name, email, password: hashedPassword, mobile,isAlumni,batchYear,degree,resumeLink, photo });

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

export const notification = async (req,res)=>{
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
export const getAlumni = async (req, res) => {
    try {
        const alumni = await Student.find({ isAlumni: true });
        res.json(alumni);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
export const getProfileById = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findById(id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

