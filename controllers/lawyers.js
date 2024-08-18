const lawyer = require("../models/lawyer");
const jwt = require('jsonwebtoken');
const secretKey = "umerFinalYearProject";


const lawyerSignUp = async (req, res) => {
    let {name, email, password, phone, dob, specialization, city} = req.body;
      try {
        let newUser = await lawyer.create({
            name,
            email, 
            password,
            phone,
            dob,
            specialization,
            city,
            role: 'l'
        });
        res.status(201).json({success: true, msg: `User created with id: ${newUser._id}`});
      } catch (error) {
        res.json({success: false, msg: error});
      }
}


const lawyerLogin = async (req, res) => {
  
  let { email, password } = req?.body;

  try {
    let user = await lawyer.findOne({ email });

    if (!user) {
      return res.status(401).json({ success: false, msg: "Invalid Email" });
    }
    if (user.password !== password) {
      return res
        .status(401)
        .json({ success: false, msg: "Incorrect Password" })
        .end();
    }

    let token = jwt.sign({uId: user._id}, secretKey);
    res.json({token, msg: 'Login Successfull', success: true, role: user.role});
  } catch (error) {
    return res.json(error);
  }
}


const lawyerGetInfo = async (req, res) => {
  
  const token = req.body.token;
     
  const id = jwt.verify(token, secretKey);
  const user = await lawyer.findById(id.uId);
  res.json(user);
  
}


const editLawyer = async (req, res) => {
  console.log(req.body);
  
  const token = req.body.token;
  const {exp, bio} = req.body;
  const id = jwt.verify(token, secretKey);
  const user = await lawyer.findByIdAndUpdate(id.uId, {exp, bio});
  res.status(201).json(user);
}


module.exports = {
    lawyerSignUp,
    lawyerLogin,
    lawyerGetInfo,
    editLawyer
}