// import Post from "../models/Post.js";
// import User from "../models/User.js";

// /* CREATE */
// export const createPost = async (req, res) => {
//   try {
//         //getting userId,description, picturePath from the front end.
//     const { userId, description, picturePath } = req.body;

//     //finding the user.
//     const user = await User.findById(userId);

//     //creating the newpost
//     const newPost = new Post({
//       userId,
//       firstName: user.firstName,
//       lastName: user.lastName,
//       location: user.location,
//       description, //post description
//       userPicturePath: user.picturePath, //user profile picture path
//       picturePath, //post picture path
//       likes: {},
//       comments: [],
//     });
//     await newPost.save(); //saving the post in DB

//     //gets all the post and return to front end
//     const post = await Post.find();
//     res.status(201).json(post);
//   } catch (err) {
//     res.status(409).json({ message: err.message });
//   }
// };

// /* READ */
// export const getFeedPosts = async (req, res) => {
//   try {
//     //return all the post stored in DB
//     const post = await Post.find();
//     res.status(200).json(post);
//   } catch (err) {
//     res.status(404).json({ message: err.message });
//   }
// };

// export const getUserPosts = async (req, res) => {
//   try {
//     // searches for that particular post and return it
//     const { userId } = req.params;
//     const post = await Post.find({ userId });
//     res.status(200).json(post);
//   } catch (err) {
//     res.status(404).json({ message: err.message });
//   }
// };

// /* UPDATE */
// //This code block is used to update the likes of a post
// export const likePost = async (req, res) => {
//   try {
//     const { id } = req.params;  //post id
//     const { userId } = req.body; //user id sent from the front edn
//     const post = await Post.findById(id); //finding that particular post with details.
//     const isLiked = post.likes.get(userId); //checking if the user has already liked the post

//     if (isLiked) {
//       post.likes.delete(userId); //if user has already liked it then removing the likes
//     } else {
//       post.likes.set(userId, true);//If user hasn't liked it then adding the likes.
//     }

//     //updating the likes of the post and send it back to front end
//     const updatedPost = await Post.findByIdAndUpdate(
//       id,
//       { likes: post.likes },
//       { new: true }
//     );

//     res.status(200).json(updatedPost);
//   } catch (err) {
//     res.status(404).json({ message: err.message });
//   }
// };
