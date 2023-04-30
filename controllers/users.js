import User from "../models/User.js";
import mongoose from "mongoose";
import Meeting from "../models/Meeting.js";
/* READ */
//Gets all the users 
export const getAllUsers = async(req,res)=>{
  try{
    const user = await User.find();
    res.status(200).json(user);
  }
  catch (err) {
    res.status(404).json({ message: err.message });
  }
}
//Gets particular user details 
export const getUser = async (req, res) => {
  try {
    //searching the user by id and returns the entire user details if found.
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
//This code block retrieves a user's friends list and sends it as a JSON response to the client.
export const getUserFriends = async (req, res) => {
  try{
    const {loggedInUserId} = req.params;
    const meeting  = Meeting.find({loggedInUserId});
    res.status(200).json(meeting);
  }
  catch (err) {
    res.status(404).json({ message: err.message });
  }
};
/* UPDATE */
export const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    const user = await User.findById(id); //gets the current user details
    const friend = await User.findById(friendId);//gets the friemd details

    //If user is already a friend of "friend" then do:
    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((id) => id !== friendId); //filter friend from user
      friend.friends = friend.friends.filter((id) => id !== id); //filter user from friends
    } else {
      // Adding friend to user and user to friend
      user.friends.push(friendId);
      friend.friends.push(id);
    }
    //saving the changes made in friend and user to DB
    await user.save();
    await friend.save();

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    //Formatted using map with only certain selected properties.
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );
    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const updateSlots = async(req,res)=>{
  try{
    const {userId,friendId,itemNo} = req.body;
    const validUserId = mongoose.Types.ObjectId(userId);
    const validFriendId = mongoose.Types.ObjectId(friendId);
    const user = await User.findById(validUserId); 
    const friend = await User.findById(validFriendId);
    user.availability[itemNo] = 1;
    friend.availability[itemNo] = 1;
    await user.save();
    await friend.save();
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { availability: user.availability },
      { new: true }
    );
    const updatedFriend = await User.findByIdAndUpdate(
      friendId,
      { availability: friend.availability },
      { new: true }
    );
    // saving the meeting details in the data base.
    const newData1 = new Meeting({userId,friendId,itemNo});
    await newData1.save();
    res.status(200).json({newData1});
  }
  catch (err) {
    console.log("cannot found !!");
    res.status(404).json({ message: err.message });
  }
}