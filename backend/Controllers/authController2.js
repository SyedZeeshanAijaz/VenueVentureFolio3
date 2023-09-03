import User from "../models/User.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// user register
export const register = async (req, res) => {
  try {
    // Hashing password
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    let role = 'user'; // Set the default role as "user"

    // Check if the role is specified and assign it accordingly
    if (req.body.role && req.body.role.toLowerCase() === 'admin') {
      role = 'admin';
    }

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash,
      photo: req.body.photo,
      role: role, // Assign the role
    });

    await newUser.save();

    res.status(200).json({ success: true, message: "Successfully created!" });
  } catch (error) {
    res.status(500).json({ success: false, message: "User is already registered with this email" });
  }
};

export const login = async (req, res) => {
  try {
    const email = req.body.email;
    const user = await User.findOne({ email });

    // if user doesn't exist
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found!' });
    }

    // if user is exist then check the password or compare the password
    const checkCorrectPassword = await bcrypt.compare(req.body.password, user.password);

    // if password incorrect
    if (!checkCorrectPassword) {
      return res.status(401).json({ success: false, message: 'Incorrect email or password!' });
    }

    const { password, ...rest } = user._doc;

    // create jwt token
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });

    // Send the response with the token and role field included
    res.status(200).json({ token, data: { ...rest, role: user.role } });
    console.log(token)
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to login' });
  }
};
