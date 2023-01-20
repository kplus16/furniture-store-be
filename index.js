// setup dependencies
const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
require("dotenv").config();


//server setup
const app = express();
const port = 5001;
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//cors
app.use(cors());

//connect database
mongoose.connect(
  `mongodb+srv://kendrick123:${process.env.MONGODB_PASSWORD}@cluster0.nkwttx3.mongodb.net/Furniture_Store_db?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true }
);

let db = mongoose.connection;
//error handling
db.on("error", console.error.bind(console, "Conn error"));
db.on("open", () => console.log("Connected to database"));

//call Routes
const loginRoute = require("./Routes/loginRoute");


//use routes
app.use("/user", loginRoute);



app.listen(port, () => console.log(`Server listening at port: ${port}`))