const { UserModel } = require("../model/UserModel");
const jwt=require("jsonwebtoken");
const bcrypt = require("bcrypt");
const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (user) {
      return res.status(400)
        .json({ message: "User is already exists", success: false })
    }
    const newUser = UserModel({ name, email, password });
    newUser.password = await bcrypt.hash(password, 10);
    await newUser.save();
    res.status(201)
      .json({
        message: "signup successfull",
        success: true
      })
  } catch (err) {
    console.error(err);
    res.status(500)
      .json({
        message: "internal server erroe",
        success: false
      })

  }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    const errorMsg="Auth faield email or password is wrong";
    if (!user) {
      return res.status(403)
        .json({ message:errorMsg, success: false })
    }
    const isPassword=await bcrypt.compare(password,user.password);
    if(!isPassword){
      return res.status(403)
        .json({ message:errorMsg, success: false })
    }
    const jwtToken=jwt.sign(
      {email:user.email,_id:user._id},
      process.env.JWT_SECRET,
      {expiresIn:'24h'}


    )
    res.status(201)
      .json({
        message: "Login successfull",
        success: true,
        jwtToken,
        email,
        name:user.name
      })
  } catch (err) {
    console.error(err);
    res.status(500)
      .json({
        message: "internal server erroe",
        success: false
      })

  }
}

module.exports = { signup,login };