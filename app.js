import cookieParser from 'cookie-parser';
import { config } from "dotenv";
import express from 'express';
import studentRouter from './routes/student.js';
import adminRouter from './routes/admin.js';
import cors from "cors";
import path from 'path';
export const app = express();


config({
    path:'./data/config.env'
})

// Using middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET","POST","PUT","DELETE"],
    credentials: true,
}))

app.set('view engine', 'ejs');
app.set('views', path.join('C:','Users','Rohit Pandey','Desktop','IIITA HUB BACKEND', 'views'));

app.use("/api/v1/student",studentRouter);
app.use("/api/v1/admin",adminRouter);

app.get("/",(req,res)=>{
    res.render('index');
});


