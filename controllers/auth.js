import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

/* REGISTER USER */
export const register = async (req, res) => {
  try {
    //Getting these information from the front-end which sends these info which is stored in req.body
        //viewedProfile and impressions are not here because when creating user it cannot be sent.
        
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      friends,
      location,
      occupation,
    } = req.body;

    //salt is a random string that is added to the input of a hash function to prevent attackers from using precomputed lookup tables to crack passwords
        //When a password is hashed with a salt, the resulting hash value is unique even if the same password is hashed multiple times, because the salt is different each time.
        
    const salt = await bcrypt.genSalt();

    //Generated salt value is used to hash the password and secure it.
    const passwordHash = await bcrypt.hash(password, salt);
    
    //viewedProfile and impressions assigned with some random value because after creating the user and to store it in the database
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      picturePath,
      friends,
      location,
      occupation,
      viewedProfile: Math.floor(Math.random() * 10000),
      impressions: Math.floor(Math.random() * 10000),
    });
    const savedUser = await newUser.save();
  
    //From the server sending back the user details in json format with status code 201.
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* LOGGING IN */
//User enter the email and password to login

export const login = async (req, res) => {
  try {
    
    //get the email and password from the frontend which sends in req.body
    const { email, password } = req.body;

    //check the "User" database if that mail exists if yes return the entire user details
    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).json({ msg: "User does not exist. " });

    //comparing the password entered by the user and password present in the "User" database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " });

    //The jwt.sign method is used to generate the JSON web token
        //The first argument to this method is a JavaScript object containing the payload data to be encoded in the token
        //The second argument to the jwt.sign method is a secret key used to sign the token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
