const { signup, login } = require("../controllers/AuthController");
const { signupValidation, loginValidation } = require("../Middlewares/Validation");

const router = require("express").Router();



router.post("/signup",signupValidation,signup);

router.post("/login",loginValidation,login);

module.exports = router;