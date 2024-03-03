import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userServices from "./user-services.js";

const creds = [];

export async function registerUser(req, res) {
  const { name, email, pwd } = req.body;

  if (!name || !email || !pwd) {
    res.status(400).send("Bad request: Invalid input data.");
  } else {
    try {
      const existingUser = await userServices.findUserByEmail(email);

      if (existingUser) {
        res.status(409).send("Account with this email already exists");
      } else {
        const hashedPassword = await bcrypt.hash(pwd, 10);
        await userServices.addNewUser(name, email, hashedPassword);

        generateAccessToken(email).then((token) => {
          console.log("Token:", token);
          res.status(201).send({ token });
        });
      }
    } catch (error) {
      console.error("Error during user registration:", error);
      res.status(500).send("Internal Server Error");
    }
  }
}

// change creds.find and creds.push to find from users collection in db and add to db -- should have some code for this in backend.js

function generateAccessToken(username) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      { username: username },
      process.env.TOKEN_SECRET,
      { expiresIn: "1d" },
      (error, token) => {
        if (error) {
          reject(error);
        } else {
          resolve(token);
        }
      }
    );
  });
}

export function authenticateUser(req, res, next) {
  const authHeader = req.headers["authorization"];
  //Getting the 2nd part of the auth header (the token)
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    console.log("No token received");
    res.status(401).end();
  } else {
    jwt.verify(token, process.env.TOKEN_SECRET, (error, decoded) => {
      if (decoded) {
        req.user = decoded;
        next();
      } else {
        console.log("JWT error:", error);
        res.status(401).end();
      }
    });
  }
}

export async function loginUser(req, res) {
  const { email, pwd } = req.body;

  try {
    const retrievedUser = await userServices.findUserByEmail(email);
    // console.log(retrievedUser);

    if (!retrievedUser) {
      // invalid username
      res.status(401).send("Unauthorized email");
    } else {
      const matched = await bcrypt.compare(pwd, retrievedUser.hashedPassword);

      if (matched) {
        generateAccessToken(email).then((token) => {
          res.status(200).send({ token });
        });
      } else {
        // invalid password
        res.status(401).send("Unauthorized password");
      }
    }
  } catch (error) {
    console.error("Error during user login:", error);
    res.status(500).send("Internal Server Error");
  }
}
