
import { createServer } from "node:http";
import express from "express";
import { Server } from "socket.io";
import { chessMoveHandler } from "./socket/chessMoveHandler.js";
import authRoute from "./router/Authentication.js"
import cors from "cors";
import pool from "./db.js";
import dotenv from "dotenv";
dotenv.config();
import session from "express-session";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import User from "./models/user.js"

const app = express()
const server = createServer(app);
const port = 8080

const io = new Server(server, {
  cors: {
    origin: "*"
  }
})

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}))

await pool.query('select 1');
await User.createTable();

app.use(express.json());

const sessionOptions = {
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  },
};

app.use(session(sessionOptions));
app.use(passport.initialize());
app.use(passport.session());
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findByUsername(username);

      if (!user) {
        return done(null, false, {
          message: "Invalid username or password",
        });
      }

      const bcrypt = await import("bcrypt");
      const isValid = await bcrypt.default.compare(
        password,
        user.password
      );

      if (!isValid) {
        return done(null, false, {
          message: "Invalid username or password",
        });
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.user_id);
});

passport.deserializeUser(async (userId, done) => {
  try {
    const user = await User.findById(userId);
    done(null, user || false);
  } catch (error) {
    done(error);
  }
});


chessMoveHandler(io);

app.use("/signup",authRoute);



app.get('/', (req, res) => {
  res.send('Hello World!');
})

server.listen(port, () => {
  console.log(`App listening on port ${port}`)
})