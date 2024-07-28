import dotenv from 'dotenv';
dotenv.config();

import { app } from "./app.js";
import { connectDB } from "./data/database.js";

connectDB();

const PORT = process.env.PORT || 4000;
const NODE_ENV = process.env.NODE_ENV || 'development';

app.listen(PORT, () => {
    console.log(`Server is working on port: ${PORT} in ${NODE_ENV} mode`);
});
