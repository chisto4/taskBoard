import express from "express";

import userRouter from './Router/userRouter.js';

const PORT = process.env.PORT || 3005;

const app = express();

app.use(express.json());
app.use(userRouter);

app.listen(PORT, function(){
    console.log(`Server work on port ${PORT}`)
});