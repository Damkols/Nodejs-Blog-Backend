import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import multer from "multer";
import path from "path";
dotenv.config();
const __dirname = path.resolve();

//Routes
import userRoutes from "./routes/users.js";
import authRoutes from "./routes/auth.js";
import categoryRoutes from "./routes/categories.js";
import postRoutes from "./routes/posts.js";

const app = express();
const PORT = process.env.PORT || 4000;

//Body Parser middleware
app.use(bodyParser.json());

app.use("/images", express.static(path.join(__dirname, "/images")));

//Connect to MongoDb
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    /*  useCreateIndex: true,
    useFindAndModify: true,*/
  })
  .then(() => console.log("MongoDb connected!!"))
  .catch((err) => console.log(err));

const storage = multer.diskStorage({
  destination: (req, file, callb) => {
    callb(null, "images");
  },
  filename: (req, file, callb) => {
    //callb(null, "file.png")
    callb(null, req.body.name);
  },
});
const upload = multer({ storage: storage });
app.post("/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});

// Using Routes
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/category", categoryRoutes);

app.get("/", (req, res) => {
  console.log("[TEST]!");
  res.send("Hello from Homepage");
});

app.listen(PORT, () =>
  console.log(`Server Running on port : http://localhost:${PORT}`)
);
