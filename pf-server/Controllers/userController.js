const users = require('../Models/userSchema');
const jwt = require('jsonwebtoken')
// register
exports.register = async (req, res) => {
    // res.status(200).json("Register request received");
    console.log("inside register function");
    const { username, email, password } = req.body; // Make sure property names are correct
    console.log(`Username:${username}, Email: ${email}, Password: ${password}`);
    
    // check already existing user
    try {
        const existingUser = await users.findOne({ email });
        if (existingUser) {
            res.status(406).json("User already exists. Please check!!!");
        } else {
            // register user
            const newUser = new users({
                username,
                email,
                password,
                image: "",
                github: "",
                linkedin: "",
            });
            await newUser.save();
            res.status(200).json(newUser);
        }
    } catch (err) {
        res.status(401).json(`Error!!! Transaction failed: ${err}`);
    }
};



// login
exports.login = async (req,res)=>{
    console.log("Inside login function");
    const {email,password} = req.body
    try{
        // check user exist
        const existingUser = await users.findOne({email,password})
        if(existingUser){
            // generate token
            const token = jwt.sign({userId:existingUser._id},"superSecretKey123")
            res.status(200).json({
                existingUser,
                role:"user",
                token:token
            })
        }else{
            res.status(404).json("incorrect email / password")
        }
    }catch(err){
        res.status(401).json(`Error!!! transaction failed: ${err}`)
    }
}

exports.updateProfile = async(req,res)=>{
    const {username,email,password,github,linkedin,profileImage} = req.body
    const userId = req.user
    const userImage = req.file ? req.file.filename : profileImage;
   try {
  const updatinguser = await users.findByIdAndUpdate(
    { _id: userId },
    { username, email, password, image: userImage, github, linkedin },
    { new: true }
  );
  res.status(200).json(updatinguser);
} catch (err) {
  console.error(err);
  res.status(401).json(err);
}
}



