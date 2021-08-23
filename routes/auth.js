const router = require("express").Router();
const User = require("../model/User");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const { omit, lte } = require("lodash");
const transporter = require('../config/mailer');

const {
  registerValidation,
  loginValidation,
} = require("../validation/validation");

//Login
router.post("/login", async (req, res) => {
  let token = req.body.token;
  let email = req.body.email;
  let password = req.body.password;

  console.log(token);

  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error);

  let user;
  if (token) {
    user = await User.findOne({ token: token }).exec();
    console.log('token');
  } else {
    user = await User.findOne({ email: email }).exec();
    console.log('user with email');

    if (!user) {
      return res.status(400).send();
    }

    //password correct?
    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) {
      return res
        .status(400)
        .send("La contraseña que has introducido es invalida.");
    }
  }
  console.log(user);

  if (!user) {
    console.log('error');
    return res.status(400).send();
  }

  //Create and anssign a token if it doesn't exist
  let authToken = user.token;
  console.log('user is ' + user);
  if (!authToken) {
    authToken = jwt.sign({ _id: user._id }, process.env.ACCESS_TOKEN_SECRET);
    console.log("authToken", authToken, user._id);
    await User.updateOne({ _id: user._id }, { token: authToken });
  }
  res.send({ user: omit(user.toObject(), ["password"]), token: authToken });
});


//Logout 
router.post("/logout", async (req, res) => {
  let token = req.body.token;
  let user;
  console.log('logout', token)
  if (token) {
    user = await User.findOne({ token: token }).exec();
  } 
  console.log('logout', user)
    if (!user) {
      return res.status(400).send();
    }

  await User.updateOne({ _id: user._id }, {$unset: {token: 1 }});

  res.status(200).send();
});




// we need a body parser
// and we need some time to submit to database so we need a
//async method
//register


router.delete("/user",async (req, res) => {
  let token = req.query.authToken;
  let id ;
  console.log(token);
  try{
    const user = await User.findOne({ token: token });
    
  }catch (err) {
    console.log("No se ha encontrado usuario")
    res.status(400).send();
  }
  id = user._id;
  console.log(id)
  
try{
  const userExists = await User.deleteOne({ _id: id});
  if (!userExists) { res.status(400).send(err);}
  res.status(200).send();
}catch(err){
  res.status(400).send(err);
}
   
})

router.post("/register", async (req, res) => {
  let name = req.body.name;
  let email = req.body.email;
  let password = req.body.password;
  let subject = req.body.subject;
  let course = req.body.course;

  //VALIDATE THE DATA BEFORE WE A USER
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error);

  //checking if the email is already in DB
  const emailExist = await User.findOne({ email: email });
  if (emailExist) {
    return res.status(409).send("El correo electronico ya existe");
  }

  // hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = new User({
    name: name,
    email: email,
    password: hashedPassword,
    subject : subject,
    course: course,

  });
  try {
    const savedUser = await user.save();
    res.send('user saved in database');
     // send mail with defined transport object
     try{
      let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
          user: 'spimapp21@gmail.com', // generated ethereal user
          pass: 'xovn jmtb mwkz suta', // generated ethereal password
        },
      });
  let info = await transporter.sendMail({
    from: '"Spim UPV" <spimapp21@gmail.com>', // sender address
    to: email, // list of receivers
    subject: " ¡Bienvenid@! " + name, // Subject line
    text: "Hola " + name +", gracias por unirte a Spim UPV, ¡estamos felices de contar contigo!", // plain text body
  });
  console.log(info);
}catch(err){ console.log(err)}
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
