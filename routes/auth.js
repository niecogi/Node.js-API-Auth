const router = require("express").Router();
const User = require("../model/User");
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
const bcrypt = require("bcryptjs");
const {
  registerValidation,
  loginValidation,
} = require("../validation/validation");

//Login

router.post("/login", async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error);

  const user = await User.findOne({ email: email });
  if (!user) {
    return res
      .status(400)
      .send(
        "El correo electrónico que has introducido no está conectado a una cuenta."
      );
  }
  //password correct?
  const validPass = await bcrypt.compare(password, user.password);
  if (!validPass) {
    return res
      .status(400)
      .send("La contraseña que has introducido es invalida.");
  }

//Create and anssign a token
const token = jwt.sign({_id: user._id}, process.env.ACCESS_TOKEN_SECRET);
res.header('auth-token',token).send(token);

//res.send('Logged in!');
});

// we need a body parser
// and we need some time to submit to database so we need a
//async method
//register
router.post("/register", async (req, res) => {
  let name = req.body.name;
  let email = req.body.email;
  let password = req.body.password;

  //VALIDATE THE DATA BEFORE WE A USER
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error);

  //checking if the email is already in DB
  const emailExist = await User.findOne({ email: email });
  if (emailExist) {
    return res.status(400).send("El correo electronico ya existe");
  }

  // hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = new User({
    name: name,
    email: email,
    password: hashedPassword,
  });
  try {
    const savedUser = await user.save();
    res.send({ user: user._id });
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
