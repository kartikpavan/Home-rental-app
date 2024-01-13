import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import authRoute from "./routes/auth.route.js";
const app = express();

// global middlewares
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("Welcome to the root of Home rental Application");
});
// route middlewares
app.use("/api/auth", authRoute);

// 404 route
app.use("/*", (req, res) => {
  return res.status(404).json({ error: "Page Not Found" });
});

async function start() {
  await mongoose.connect(process.env.MONGO_URI);
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});

start()
  .then(() => console.log("Connection to MONGODB established Successully"))
  .catch((error) => console.log("connection to the DB failed" + error));
