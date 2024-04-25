import mongoose from "mongoose";

const schema1 = new mongoose.Schema({
    name: {
       type: String,
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
        select: false,
    },
    enrollment_no:{
        type: String,
    },
    batch:{
        type: Number,
    },
    mobile:{
        type: Number,
    },
});
export const Student = mongoose.model("student",schema1);
