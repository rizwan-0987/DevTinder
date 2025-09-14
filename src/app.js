import express from "express";

const app = express();
app.use(express.json());

// app.use("/", (req, res,next) => {
//     console.log("working on /user")
//     next();
// })
// app.get(`/user`, (req, res) => {
//     console.log(req.query)

//     res.send({
//         name: "Rizwan",
//         age : "24"
//     })
// })
// app.get("/user/:id/:age/:address", (req, res) => {
//     console.log(req.params)

//     res.send({
//         name: "Rizwan",
//         age: "24"
//     })
// })
// app.post("/user",(req, res) => {
//     res.send("user added in db")
// })
// app.put("/user",(req, res) => {
//     res.send("user updated in db")
// })
// app.delete("/user", (req, res) => {
//     res.send("user deleted")
// })

////Multiple route handlers

// app.use("/user", (req, res, next) => {
//     console.log("route handler 1")
//     next();

//     // res.send("route handler 1")
// },
//     (req, res, next) => {
//         console.log("route handler 2")
//         // res.send("route handler 2")
//         next();
//     },
//    [ (req, res, next) => {
//         console.log("route handler 3")
//         // res.send("route handler 3")
//         next()
//     },
//     (req, res, next) => {
//         console.log("route handler 4")
//         // res.send("route handler 4")
//         next()
//     }],
//     (req, res, next) => {
//         console.log("route handler 5")
//         // next()

//         res.send("route handler 5")
//     },
// )

////multiple routes with same path and / middlewear

// app.use("/",(req, res ,next)=> {
//     console.log("handling your request....")
//     next();
// })
// app.get("/user", (req, res, next) => {
//     // res.send("route handle 1")
//     next();
// })
// app.get("/user", (req, res, next) => {
//     res.send("route handle 2")
// })

///Auth handler for user and admin
// import { authAdmin, authuser } from './middlewear/auth.js';

// app.get("/admin/getAllData",authAdmin, (req, res) => {
//     res.send("Here is all data for admin")
// })

// app.get("/user/data", authuser, (req, res) => {
//     res.send("username : rizwan")
// })
// app.get("/user/login", (req, res) => {
//     res.send("you are getting login")
// })

/////Wild Card Error handling
// app.get("/user", (req, res) => {
//     try {
//         throw new Error()

//     } catch (error) {
//         res.status(401).send("Catch: Something went Wrong ")
//     }
// })

// app.use("/", (err, req, res, next) => {
//     res.status(401).send("something went wrong")
// })
import { signupValidate, loginValidate } from "./utils/validator.js";
import bcrypt from "bcrypt";

app.post("/signup", async (req, res) => {
  const { firstName, lastName, emailId, password } = req.body;
  try {
    //validating api req
    signupValidate(req);
    //pass hashing
    const passwordHash = await bcrypt.hash(password, 10);
    //creating new instance
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });
    // saving to db
    await user.save();
    res.status(201).send("user registered");
  } catch (error) {
    res.status(401).send(error.message);
  }
});
/////////////////////////////////login////////////////////////////////////////////////////////
app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    loginValidate(req);
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("invalid credentials");
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      throw new Error("invalid credentials");
    }
    if (validPassword) {
      res.send("login successfully");
    }
  } catch (error) {
    res.send(error.message);
  }
});

//find user by email
app.get("/userEmail", async (req, res) => {
  try {
    const data = await User.find({ emailId: req.body.emailId });

    if (data.length === 0) {
      res.status(404).send("user not found");
    } else {
      res.status(200).send(data);
    }
  } catch (error) {
    res.status(401).send("something went wrong");
  }
});

// find user by id

app.get("/userid", async (req, res) => {
  const userid = req.body;
  try {
    const user = await User.findById(userid);
    if (!user) {
      res.status(404).send("user not found");
    } else {
      res.status(200).send(user);
    }
  } catch (error) {
    res.status(401).send("something went wrong" + error.message);
  }
});
//get all users
app.get("/feed", async (req, res) => {
  try {
    const allUsers = await User.find({});
    if (!allUsers) {
      res.status(404).send("user not found");
    } else {
      res.status(200).send(allUsers);
    }
  } catch (error) {
    res.status(401).send("something went wrong");
  }
});
//delete user by id

app.delete("/user/delete", async (req, res) => {
  try {
    const userid = req.body.userid;
    const user = await User.findByIdAndDelete(userid);
    res.status(202).send("user deleted successfully");
  } catch (error) {
    res.status(401).send("something went wrong");
  }
});

///update user with id

app.patch("/user/update/:id", async (req, res) => {
  const userid = req.params.id;
  const newData = req.body;
  const ALLOWED_UPDATE = [
    "firstName",
    "lastName",
    "age",
    "gender",
    "photoUrl",
    "about",
    "skills",
    "password",
  ];

  try {
    const isAllowedUpdate = Object.keys(newData).every((k) =>
      ALLOWED_UPDATE.includes(k)
    );
    console.log(isAllowedUpdate); ///shows resut of isAllowed.
    if (!isAllowedUpdate) {
      throw new Error("Update Not Allowed");
    }
    const update = await User.findByIdAndUpdate(userid, newData, {
      runValidators: true,
    });
    res.status(203).send("user updated successfully");
  } catch (error) {
    res.status(401).send(error.message);
  }
});
///update user with email

app.patch("/user/update/email", async (req, res) => {
  const useremail = req.body.emailId;
  const newData = req.body;
  try {
    const update = await User.findOneAndUpdate({ emailId: useremail }, newData);
    res.status(203).send("user updated successfully");
  } catch (error) {
    res.status(401).send("something went wrong");
  }
});

///
import { connectdb } from "./config/database.js";
import { User } from "./models/user.js";

connectdb()
  .then(() => {
    console.log("db connected succesfully");
    app.listen(7777, () => console.log("Server is running on port 7777"));
  })
  .catch((err) => {
    console.log("db connection failed");
  });
