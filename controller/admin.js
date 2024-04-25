import { Admin} from "../models/admin.js";
import { Student } from "../models/student.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/feature.js";
import jwt from "jsonwebtoken";


export const register = async (req, res) => {
    const { name, email, password, mobile} = req.body;
    try {
        let admin = await Admin.findOne({ email });

        if (admin) {
            return res.status(400).json({
                success: false,
                message: "User already exists",
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        admin = await Admin.create({ name, email, password: hashedPassword, mobile });

        sendCookie(admin, res, "Registered Successfully", 201);
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
    console.log(email);
    console.log(password);
    const admin = await Admin.findOne({ email }).select("+password");
    if (!admin) {
        return res.status(404).json({
            success: false,
            message: "Invalid Email id or Password",
        });
    }
    const username = admin.name;

    bcrypt.compare(password, admin.password, (err, isMatch) => {
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
        sendCookie(admin, res, "Welcome back, " + username, 200);
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
    const admin= await Admin.findById(decoded._id);

    res.status(200).json({
        success:true,
        admin,
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
    
    const {  name, email, password, mobile} = req.body;

    try {
        let admin = await Admin.findOneAndUpdate({ email }, { $set: { name, password, mobile} });

        if (admin) {
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
    const { token }=req.cookies;

    if(!token)
    return res.status(404).json({
        success: false,
        message:"Login First",
    });
    try{
        const decoded= jwt.verify(token,process.env.JWT_SECRET);
        const admin= await Student.findById(batch);
        console.log(admin);
        res.status(200).json({
            success:true,
            admin,
        })
    }catch(err){
        res.status(404).json({
            success:false,
            message:"Server Error",
        });
    }
}