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
    },
    isAlumni:{
        type: String,
    },
    batchYear:{
        type: Number,
    },
    degree:{
        type: String,
    },
    resumeLink:{
        type: String,
    },
    mobile:{
        type: Number,
    },
    photo:{
        type: String,
    },
});
export const Student = mongoose.model("student",schema1);
