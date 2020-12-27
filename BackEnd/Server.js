import express from 'express';
import http from 'http';
import cors from 'cors';
import fs, { readSync } from 'fs';
import fse from 'fs-extra';
import path from 'path';
import replaceExt from 'replace-ext';
import axios from 'axios';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import courseRoute from './Routes/courseRoute.js';
import lessonRoute from './Routes/lessonRoute.js';
import userRoute from './Routes/userRoute.js';
import meetingRoute from './Routes/meetingRoute.js';
import sessionRoute from './Routes/sessionRoute.js';
import emailRoute from './Routes/emailRoute.js';
import videoRoute from './Routes/videoRoute.js';
import fileRoute from './Routes/fileRoute.js';
import classRoomRoute from './Routes/classRoomRoute.js';
import operatorRoute from './Routes/operatorRoute.js';
import gradeRoute from './Routes/gradeRoute.js';
import attendanceRoute from './Routes/attendanceRoute.js';


const app = express();
const server = http.createServer(app);
const db = mongoose.connection;
const localPort = 9005;


// app.use('/static', express.static('public/backEnd'))
app.use('/static', express.static('public/videos'))

app.use(cors());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
   extended: true
}));

app.use('/api/v1/courses', courseRoute);

app.use('/api/v1/lessons', lessonRoute);

app.use('/api/v1/users', userRoute);

app.use('/api/v1/meetings', meetingRoute);

app.use('/api/v1/emails', emailRoute);

app.use('/api/v1/uploads', videoRoute);

app.use('/api/v1/fileUploads', fileRoute);

app.use('/api/v1/sessions', sessionRoute);

app.use('/api/v1/classrooms', classRoomRoute);

app.use('/api/v1/operators', operatorRoute);

app.use('/api/v1/grades', gradeRoute);

app.use('/api/v1/attendance', attendanceRoute);



mongoose.connect('mongodb+srv://dbuser:dbuser2020@cluster0.8heal.mongodb.net/teach?retryWrites=true&w=majority', {
   useNewUrlParser: true, 
   useUnifiedTopology: true,
   useCreateIndex: true,
   useFindAndModify: false
});


db.on("error", console.error.bind(console, "connection error:"));


db.once("open", function() {
  console.log("Connection Successful!");
});


app.get('/', (req, res) => {
   res.send('hello and welcome to teach !!!');
});

 
server.listen(localPort, () => {
 console.log('listening on', localPort);
});


