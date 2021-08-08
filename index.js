const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const fileUpload = require('express-fileupload');

//IMPORTS ROUTES
const authRoute = require('./routes/auth');
const postsRoute = require('./routes/posts');
const postsFiles = require('./routes/files');


dotenv.config();

//Connect to DB
mongoose.connect(
    process.env.DB_CONNECT,
    { useNewUrlParser: true },
    () => console.log('connected to db!')  
);
//middleware
app.use(express.json());

//enabled CORS 
app.use(cors());


app.use(fileUpload());
//Route Middleware
app.use('/api/user',authRoute)
//Route Middleware
app.use('/api/posts',postsRoute)

//Route Middleware
app.use('/api/files',postsFiles)

app.listen(8080, () => console.log('Server UP and running'));