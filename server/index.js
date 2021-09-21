const express = require("express")
const cors = require('cors')
const multer = require("multer")

const userRouter = require('./Router/userRouter');
const boardRouter = require("./Router/boardRouter");

const PORT = process.env.PORT || 3005;

const app = express();
app.use(cors())
app.use(express.json());
app.use('/static', express.static("static"));

app.get('/', (req, res) => {res.json({hello: 'Srever Worked'})})
app.use(multer({dest:"static"}).single("file"));
app.use('/', userRouter);
app.use('/workspace', boardRouter);

app.listen(PORT, function(){
    console.log(`Server work on port ${PORT}`)
});