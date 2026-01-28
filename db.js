const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://soutam1404:<db_password>@cluster0.wloyi4g..mongodb.net/loveDB?appName=Cluster0")
  .then(() => console.log("❤️ MongoDB Connected"))
  .catch(err => console.log(err));
