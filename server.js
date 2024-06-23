import express from "express";
import bodyParser from "body-parser";
import bcrypt from "bcrypt-nodejs";
import cors from "cors";
import knex from "knex";
import register from "./controllers/register.js";
import signin from "./controllers/signIn.js";
import get from "./controllers/get.js";
import image from "./controllers/image.js";

const db = knex({
  client: "pg",
  connection: {
    ssl: { rejectUnauthorized: false },
    host: "dpg-cpra4hrv2p9s73a35q50-a.frankfurt-postgres.render.com",
    port: 5432,
    user: "facebraindb_user",
    password: "0A9bgbECNHuwh9yCGGymLSNCChGf5B91",
    database: "facebraindb",
  },
});

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.listen(3000, () => {
  console.log("App is running on 3000");
});

//! Sign In
app.post("/signin", (req, res) => {
  signin.signin(req, res, db, bcrypt);
});

//! Register
app.post("/register", (req, res) => {
  register.handleRegister(req, res, db, bcrypt);
});

//! Get Users
app.get("/users", (req, res) => {
  get.users(req, res, db);
});

//! Get Profile by id
app.get("/profile/:id", (req, res) => {
  get.profile(req, res, db);
});

//! Image
app.put("/image", (req, res) => {
  image.image(req, res, db);
});

//! Clarifai Call
app.post("/clarifai", (req, res) => {
  image.clarifai(req, res);
});
