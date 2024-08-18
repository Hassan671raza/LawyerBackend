const Client = require('../models/client');
const jwt = require('jsonwebtoken');
const secretKey = "umerFinalYearProject";


const clientSignUp = async (req, res) => {
  let { name, email, password, phone, dob } = req.body;
  
  try {
      // Logging input data for Vercel logs
      console.log("Received signup request with data:", { name, email, phone, dob });

      // Creating a new user
      let newUser = await Client.create({
          name,
          email,
          password,
          phone,
          dob,
          role: 'c'
      });

      // Log success and return a response
      console.log("New user created successfully:", newUser);
      res.status(201).json({ success: true, msg: "Sign up Successful!" });
  } catch (error) {
      // Log the error for debugging purposes
      console.error("Error during client signup:", error);

      // Respond with a failure message
      res.status(500).json({ success: false, msg: "An error occurred during signup." });
  }
};


const clientLogin = async (req, res) => {
  let {email, password} = req.body;
  
  try {
    let user = await Client.findOne({email});
    
    if(!user){
      return res.status(401).json({success: false, msg: "Invalid Email"});
    }
    if(password !== user.password){
      return res.status(401).json({success: false, msg: "Incorrect Password"});
    }
    console.log('passed');
    
    const token = jwt.sign({uId: user._id}, secretKey);
    console.log('passed 2');
    res.status(200).json({token, success: true, msg: "Login Successfull", role: user.role});
    console.log('passed 3');
  } catch (error) {
    res.json(error);
  }
}


const getClientData = async (req, res)=>{  
  const token = req.body.token;
  const id = jwt.verify(token, secretKey);

  const user = await Client.findById(id.uId);

  res.status(200).json(user);
}

module.exports = {
    clientSignUp,
    clientLogin,
    getClientData
}