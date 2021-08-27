import express from "express";
import cors from 'cors';
import multer from "multer";

import userRouter from './Router/userRouter.js';

const PORT = process.env.PORT || 3005;

const app = express();
app.use(cors())
app.use(express.json());
app.use('/static', express.static("static"));

// app.use(express.static(__dirname  + '/static'));
app.get('/', (req, res) => {res.json({hello: 'Srever Worked'})})
app.use(multer({dest:"static"}).single("file"));
app.use('/', userRouter);

app.listen(PORT, function(){
    console.log(`Server work on port ${PORT}`)
});