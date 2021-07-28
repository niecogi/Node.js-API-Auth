const express = require('express');
const app = express();
const PORT = 3000;

//IMPORTS ROUTES
const authRoute = require('./routes/auth');



//Route Middleware

app.use('/api/user',authRoute)



app.listen(3000, () => console.log('Server UP and running'));