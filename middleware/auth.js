import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  try {
    //The req.header method is used to retrieve the value of the "Authorization" header from the incoming HTTP request. The value of this header typically contains an access token that the client has previously obtained from the server through an authentication process.
    let token = req.header("Authorization");

    if (!token) {
      return res.status(403).send("Access Denied");
    }
        //The value of the "Authorization" header is typically formatted as "Bearer [token]", where "[token]" is the actual access token value. In order to extract the token value from the header, the code may need to manipulate the string to remove the "Bearer " prefix.

    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft();
    }

    //The first argument to this method is the token itself, which is typically obtained from the "Authorization" header of an incoming HTTP request.
        //The second argument the secret key is retrieved from the process.env.JWT_SECRET environment variable.
        //If the token is valid and has not been tampered with, the jwt.verify method will return an object containing the decoded payload data
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;

    //next() is a function that is used to pass control to the next middleware function or route handler in the request handling pipeline.
        //function can then choose to either pass control to the next function using next(), or it can send a response to the client and terminate the request handling process.
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
