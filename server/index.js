import express from "express";
import cors from 'cors';

import userRouter from './Router/userRouter.js';

const PORT = process.env.PORT || 3005;

const app = express();
app.use(cors())
app.use(express.json());
app.use(express.static('static'))
app.get('/test', (req, res) => {
    res.json(
        {hello: 'hello'}
    )
})
app.use(userRouter);

app.listen(PORT, function(){
    console.log(`Server work on port ${PORT}`)
});