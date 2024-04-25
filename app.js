import cookieParser from 'cookie-parser';
import cors from "cors";
import { config } from "dotenv";
import express from 'express';
import adminRouter from './routes/admin.js';
import studentRouter from './routes/student.js';
import bodyParser from 'body-parser'; 
export const app = express();


config({
    path:'./data/config.env'
})

// Using middlewares
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());

app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET","POST","PUT","DELETE"],
    credentials: true,
}))

app.set('view engine', 'ejs');

app.use("/api/v1/student",studentRouter);
app.use("/api/v1/admin",adminRouter);

app.get("/",(req,res)=>{
    res.send('Nice Working');
});


