import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import dangerChannel from './Routes/Danger.js';
import connectdb from './mongodb.js'

const app = express();
app.use(express.json())
dotenv.config();

app.use(cors({
    origin: process.env.CLIENT_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));

app.use('/route',dangerChannel)
app.get('/',(req,res)=>{
    return res.status(201).json({
        message: "Server Connected"
    })
})

connectdb();

const server = app.listen(5004, () => {
    console.log(`Server is running on port ${process.env.PORT || 5004}`);
});




