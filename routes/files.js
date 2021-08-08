const router = require("express").Router();
const User = require("../model/User");
const File = require("../model/File");
const fs = require("fs");

//Post file in DBS
router.post("/file", async(req, res) => {
  let token = req.body.authToken;

  if (req.files === null) {
    return res.status(400).json({ msg: "No file uploaded" });
  }

  if (token === null) {
    return res.status(400).json({ msg: "No estás logeado" });
  }
  
  user = await User.findOne({ token: token }).exec();
  

  // const email = user.email;
  const file = req.files.file;
  const path = `${__dirname}/public/uploads/${user.email}`;
  const pathFile = `${__dirname}/public/uploads/${user.email}/${file.name}`;

  if (!fs.existsSync(path)) {
    fs.mkdirSync(path);
  }

  file.mv(pathFile, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }

    const fileinDB = new File({
      userID: user.email,
      fileName: file.name,
      path: pathFile,
    });
    
    try{
      const savedFile= fileinDB.save();
     
    } catch (err) {
      res.status(400).send(err);
    }

    res.json({
      fileName: file.name,
      filePath: `/uploads/${user.email}/${file.name}`,
    });
  });
});

// Get files from DB
router.get(`/files`, async (req, res) => {
  console.log('he entrado en files auth token');
  let token = req.query.authToken;
  console.log('auth token  files get' + token)


  if (token === null) {
    return res.status(400).json({ msg: "No estás logeado" });
  }
  
  user = await User.findOne({ token: token }).exec();
  console.log(user.email)
  
  if(!user){
    return res.status(400).send();
  }
   
  files = await File.find({
    userID: user.email,
  })
  console.log(files);
   
  return res.send(files);  


});

module.exports = router;
