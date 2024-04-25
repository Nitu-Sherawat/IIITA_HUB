import mongoose from "mongoose";

const schema3 = new mongoose.Schema({
    title: {
        type: String,
    },
    description: {
       type: String,
    },
    isread: {
        type: String,
    }
});
export const Notification = mongoose.model("notification",schema3);
