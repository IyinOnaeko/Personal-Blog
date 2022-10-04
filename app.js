//jshint esversion:6



//require necessary dependencies
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const e = require("express");
const _ = require("lodash");
const mongoose = require("mongoose");


// content documents for the home, about and contact pages
const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";


//use express and ejs
const app = express();
app.set('view engine', 'ejs');

//connect to mongoose and create blogDB
mongoose.connect("mongodb://localhost:27017/blogDB", {useNewUrlParser: true});

//use bodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
const length = 100;
const posts = [];


//create new postSchema 
const postSchema = {
    title: String,
    content: String
 };
 

 //create new mongoose model using postSchema
 const Post = mongoose.model("Post", postSchema);
 

//get home page
app.get("/", function (req, res) {
  res.render("home", {
    homePage: homeStartingContent,
    articlePost: posts,
    
  });
});


//get about page
app.get("/about", function(req, res){
  res.render("about", {
    aboutPage : aboutContent
  });
});


//get contact page
app.get("/contact", function(req, res){
  res.render("contact", {
    contactPage : contactContent
  });
});

//get compose page
app.get("/compose", function(req, res){
  res.render("compose");
});


//post compose page 
app.post("/compose", function(req, res){
  const post = new Post ({
    title :  req.body.titleInput,
    content : req.body.bodyInput
  });
  post.save();

  // posts.push(post);
  res.redirect("/");
})


app.get("/posts/:postName", function(req, res){
  const requestedTitle = _.lowerCase(req.params.postName);
  
  posts.forEach(function(post){
    const storedTitle = _.lowerCase(post.title);
    
    if(storedTitle == requestedTitle) {
     res.render("post", {
        displayTitle: post.title,
        displayContent: post.content
     })
    }
  })
})


app.listen(3000, function () {
  console.log("Server started on port 3000");
});
