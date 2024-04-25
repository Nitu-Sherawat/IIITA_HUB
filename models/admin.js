import mongoose from "mongoose";

const schema2 = new mongoose.Schema({
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
    mobile:{
        type: Number,
    },
});
export const Admin = mongoose.model("admin",schema2);
