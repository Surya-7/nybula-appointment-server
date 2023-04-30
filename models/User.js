import mongoose from "mongoose";

//Creating the User schema which has the following attributes: 
/*
    firstName,
    LastName
    email
    password
    picturePath (profilePicture)
    friends
    location
    occupation
    viewed Profile
    impressions
*/
const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    lastName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 5,
    },
    picturePath: {
      type: String,
      default: "",
    },
    friends: {
      type: Array,
      default: [],
    },
    availability:{
      type: Array,
      default: [0,0,0,0,0,0,0]
    },
    location: String,
    occupation: String,
    viewedProfile: Number,
    impressions: Number,
  },
  { timestamps: true }
);
const User = mongoose.model("User", UserSchema);
export default User;
