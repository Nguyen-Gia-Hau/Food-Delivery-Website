import userModle from "../models/userModel.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import validator from "validator";

const createToken = async (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET)
}

// login user
const loginUser = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await userModle.findOne({ email })

    if (!user) {
      return res.json({ success: false, message: "User don't exists" })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return res.json({ success: false, message: "Invalid credentials" })
    }

    const token = await createToken(user._id)
    res.json({ success: true, token })

  } catch (error) {
    console.log(error)
    res.json({ success: false, message: "Error" })
  }
}

// register user
const registerUser = async (req, res) => {
  const { name, password, email } = req.body
  try {
    // checking is user aldredy exists
    const exists = await userModle.findOne({ email })
    if (exists) {
      return res.json({ success: false, message: "User aldredy exists" })
    }

    // validating email format @  strong password
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Please enter a valid email" })
    }

    if (password.length < 8) {
      return res.json({ success: false, message: "Please enter a strong password" })
    }

    // hasing user passowrd
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const newUser = new userModle({
      name: name,
      email: email,
      password: hashedPassword
    })

    const user = await newUser.save()
    const token = await createToken(user._id)
    res.json({ success: true, token })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: "Error" })
  }
}

export {
  loginUser,
  registerUser
}
