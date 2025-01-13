import express from "express";
import jwt from "jsonwebtoken";
const userRouter = express.Router();
const JWT_PASS = "1234567890";
//signin with a wallet
//signing a message
const User = [
    {
        wallet: "0x1234567890",
        name: "John Doe",
        email: "john@doe.com",
        password: "1234567890",
  },
  {
    wallet: "0x1234567891",
    name: "Jane Doe",
    email: "jane@doe.com",
    password: "1234567891",
  },
  {
    wallet: "0x1234567892",
    name: "John Smith",
    email: "johnsmith@doe.com",
    password: "1234567892",
  },
];
userRouter.post("/sigin", async (req, res) => {
  //todo add a sign verification logic

  const hardCodedWallet = "0x1234567890";
  const existingUser = User.find((user) => user.wallet === hardCodedWallet);

  if (!existingUser) {
    const newUser = new User({ wallet: hardCodedWallet });
    await newUser.save();
  }
  const token = jwt.sign({
    wallet: hardCodedWallet,
  }, JWT_PASS);
  res.json({ token });
});

export default userRouter;
