import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import { register } from "./controllers/auth.js";
import { verifyToken } from "./middleware/auth.js";

/* CONFIGURATIONS */
/*Configuration*/

//The import.meta.url property is a special property available in ECMAScript modules that contains the URL of the currently executing module file.
//The fileURLToPath() function that converts a file URL to a file path. In this case, it is used to convert the import.meta.url property to a file path.
const __filename = fileURLToPath(import.meta.url);

//The path.dirname() function is used to extract the directory name portion of the __filename constant. 
const __dirname = path.dirname(__filename);

//When the config() method of the dotenv module is called, it reads the contents of the .env file (if it exists) and loads its contents as environment variables into the current process. The .env file typically contains key-value pairs in the format KEY=VALUE
dotenv.config();

const app = express();

// express.json() method is a built-in middleware function in the express module that parses incoming JSON payloads with a maximum size of 100kb. After the express.json() middleware function is executed, the parsed JSON data will be available in the req.body
app.use(express.json());

//help secure Express applications by setting various HTTP headers that can help prevent common attacks such as XSS, clickjacking, and sniffing attacks.
app.use(helmet());

//Cross-Origin-Resource-Policy HTTP header, which controls the sharing of resources across origins. value of policy is set to "cross-origin", which means that resources from other origins are allowed to be requested and displayed in cross-origin iframes, but not to be accessed by JavaScript code.
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

//The morgan("common") middleware function will log details about each incoming HTTP request to the console, including the HTTP method, URL, response status code, and response time. This can be helpful for debugging and monitoring the application during development and production.
app.use(morgan("common"));

//The body-parser package is a third-party middleware for Node.js that provides an easy way to parse HTTP request bodies. limit is 30mb which means that incoming JSON payloads larger than 30mb will be rejected with a 413 Payload Too Large.
// When extended is set to true, the JSON parser can handle nested objects and arrays present in the json payloads.
app.use(bodyParser.json({ limit: "30mb", extended: true }));

//URL encoded form data -  key-value pairs separated by an ampersand symbol (&), and each key-value pair is separated by an equals sign (=). The key and value are URL-encoded, which means that special characters are replaced with percent-encoded values. eg: username=johndoe&password=pa%24%24word
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

//CORS is a security feature implemented in web browsers to prevent web pages from making requests to a different domain than the one that served the original page. 
app.use(cors());

//In this code, the express.static middleware is used to serve static files located in the public/assets directory. The path.join(__dirname, "public/assets") function is used to construct the absolute path to the public/assets directory, based on the current directory of the Node.js script.
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

/********************************************************************************************************************************************************************************************************************************************************************** */



/* FILE STORAGE*/

//The multer.diskStorage function is used to define a storage engine for uploaded files that saves the files to disk. This function takes an object with two properties: destination and filename.
//The destination property is a function that determines where to save the uploaded files
//The filename property is a function that determines the name of the uploaded file
//The cb parameter stands for "callback", and is a function that is called when the file upload is complete.

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });
/************************************************************************************************************************************************************************************************************************************************************************ */

/*Routes Wtih Files*/
//The first argument is the endpoint that this route handler should handle, which in this case is "/auth/register". The second argument is the upload.single("picture") middleware, which is used to handle the file upload. The third argument is the register function, which is the actual route handler function

app.post("/auth/register", upload.single("picture"), register);
// app.post("/posts", verifyToken, upload.single("picture"), createPost);

/* ROUTES */
/* Routes*/
//The app.use method is used to mount the  router middleware at the  endpoint. This means that any requests to this endpoint will be handled by the router middleware.
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
// app.use("/posts", postRoutes);
// app.use("/meetings",meetRoutes);

/****************************************************************************************************************************************************************************************************************************************************************************************** */
/*MONGOOSE SETUP*/
//Getting the port number from environment variable.
const PORT = process.env.PORT || 6001;
//Connecting to the online mongoDB atlas and starting the server at PORT.
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

    //User -->Model and users -->users data from ./data/index.js
    //Post -->Model and posts -->posts data from ./data/index.js
    //Comment these two lines after running it once beause we want to populate the data only once.
    //If we didn't comment it then every time server restarts the same data gets inserted again.
    
    /* ADD DATA ONE TIME */
    // User.insertMany(users);
    // Post.insertMany(posts);
  })
  .catch((error) => console.log(`${error} did not connect`));
