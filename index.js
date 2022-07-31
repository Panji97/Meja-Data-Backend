import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import session from "express-session";
import appRoutes from "./routes/index.js";
import db from "./config/database.js";

dotenv.config();

// (async () => {
//   await db.sync();
// })();

const app = express();
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: "auto",
    },
  })
);
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000/",
  })
);
app.use(express.json());
app.use(appRoutes);

app.listen(process.env.APP_PORT, () => {
  console.log(`Server is running on port ${process.env.APP_PORT}`);
});
