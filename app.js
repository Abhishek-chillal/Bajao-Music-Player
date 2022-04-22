const express = require("express");
const bodyParaser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const app = express();

app.use(express.static("public"));

app.set('view engine', 'ejs');
app.use(bodyParaser.urlencoded({ extended: true }));

mongoose.connect("mongodb+srv://admin-abhivc:imabhi@cluster0.dlbs0.mongodb.net/MusicUserDB", { useNewUrlParser: true });

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    phone: String,
    name: String
});


const UserModel = new mongoose.model("UserCollection", userSchema);
// const newUserModel = new mongoose.model("UserCollection",userSchema);

app.get("/", function (req, res) {
    res.render("login");
});

app.get("/signup", function (req, res) {
    res.render("signup");
});

app.post("/", function (req, res) {
    const username = req.body.email;
    const password = req.body.password;

    UserModel.findOne({ email: username }, function (err, foundUser) {
        if (err) {
            console.log(err);
        }
        else {
            if (foundUser.password === password) {
                res.render("success");
            }
            else{
                res.render("failure");
            }
        }
    });
});

app.post("/signup", function (req, res) {
    const newUer = new UserModel({
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone,
        name: req.body.name
    });

    newUer.save(function (err) {
        if (!err) {
            res.render("success");
        }
        else {
            console.log(err);
        }
    });
});

app.listen(3000, function () {
    console.log("Server started at port 3000");
});