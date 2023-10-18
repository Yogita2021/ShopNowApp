const express = require("express");
const app = express();
const cors = require("cors");
const { connection } = require("./config/db");
const { userRouter } = require("./Router/user.route");
require("dotenv").config();
app.use(cors());
app.use(express.json());
// app.use("/", (req, res) => {
//   res.json({ msg: "hello I am shopnow server" });
// });

// userRoute
app.use("/user", userRouter);
app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("connected to db at port 3000 ");
  } catch (error) {
    console.log(error);
    console.log("Not connected to db");
  }
});
