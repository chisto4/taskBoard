import express from "express";
import cors from 'cors';
import multer from "multer";
import path from 'path';
// const __dirname = path.resolve();
import userRouter from './Router/userRouter.js';

const PORT = process.env.PORT || 3005;

const app = express();
app.use(cors())
app.use(express.json());
app.use(express.static("static"));
// app.use(express.json({ limit: "50mb" }));
app.get('/test', (req, res) => {
    res.json(
        {hello: 'hello'}
    )
})
// app.use(express.static(__dirname));
app.use(multer({dest:"uploads"}).single("filedata"));
app.post("/upload", function (req, res, next) {
   
    let filedata = req.file;
    console.log(filedata);
    if(!filedata)
        res.send("Ошибка при загрузке файла");
    else
        res.send("Файл загружен");
});
app.use(userRouter);

app.listen(PORT, function(){
    console.log(`Server work on port ${PORT}`)
});