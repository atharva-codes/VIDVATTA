//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const { application } = require("express");
const mongoose = require("mongoose");

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hello There👋, This is Atharva, this is my personal blog WebApp. I made it because I am very interested in doing Coding. In This Blog I mostly tags or Represent useful blogs which is needed by most of the people from Around The World for which they always try to Find Answer on Search Engines. I always try to cover Important And Useful Things. If u have any Suggestions related to Blogs or any query so PLS contact me. If i like your Suggestion so I will cover that on my Blog, so PLS don't forgot to Give your name. Thanks For Viewing my About page😊.";
const contactContent = "Thanks for visiting Contact Us Page contact me on email- contactme.atharvasen@gmail.com";

const app = express();
app.locals._ = _

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
mongoose.connect("mongodb+srv://atharvaDB:atharva@cluster0.pxyli6m.mongodb.net/?retryWrites=true&w=majority", {useNewUrlParser: true});


const postSchema = {
  postTitle: { type: String, unique: true },
  likes: { type: Number, default: 0 },
  postSubHeading: String,
  postBody: String,
  postCategory: String,
  postImage: String,
  postDate: String
}




const Post = mongoose.model("Post", postSchema);

app.get("/", (req, res) => {
  res.render('home')
})

app.get("/blogs", (req, res) => {
  var search = req.query.search;
  var page = parseInt(req.query.page) || 1;
  var limit = 4;
  var skip = (page - 1) * limit;
  if(search){
    var regex = new RegExp(search, 'i');
    Post.find({ postTitle: regex }, null, {sort: '-postDate'}).skip(skip).limit(limit).exec((err, posts) =>{
      Post.countDocuments({ postTitle: regex }).exec(function(err, count) {
        var totalPages = Math.ceil(count / limit);
        res.render("blogs", { posts: posts, totalPages: totalPages });
      });
    });
  }else{
    Post.find({}, null, {sort: '-postDate'}).skip(skip).limit(limit).exec((err, posts) =>{
      Post.countDocuments().exec(function(err, count) {
        var totalPages = Math.ceil(count / limit);
        res.render("blogs", { posts: posts, totalPages: totalPages });
      });
    });
  }
});



app.get("/web-development", (req, res) => {
  Post.find({postCategory: "WebDevelopment"}, null, {sort: '-postDate'}, (err, posts) =>{
    res.render("web-development", {posts: posts})
  })
})

app.get("/coding", (req, res) => {
  Post.find({postCategory: "Coding"}, null, {sort: '-postDate'}, (err, posts) =>{
    res.render("coding", {posts: posts})
  })
})

app.get("/about", (req, res) => {
  res.render('about', {aboutContent: aboutContent})
})

app.get("/info", (req, res) => {
  res.render('info', {contactContent: contactContent})
})

app.get("/compose", (req, res) => {
  res.render('compose')
})

app.post("/compose", (req, res) => {
  //{postTitle: req.body.postTitle, postBody: req.body.postBody}
  const post = new Post({
    postTitle: req.body.postTitle,
    postSubHeading: req.body.postSubHeading,
    postBody: req.body.postBody,
    postCategory: req.body.postCategory,
    postImage: req.body.postImage,
     postDate: req.body.postDate
  })
  post.save(err => {
    if(!err) {
      res.redirect("/");
    }
  });
})

app.get("/blog/post/:postTitle", (req, res) => {
    const requestedTitle = req.params.postTitle;
    Post.findOne({ postTitle: requestedTitle }, (err, post) => {
        if (err) {
            res.send(err);
        } else {
            post.likes += 1;
            post.save(function (err) {
                if (err) {
                    res.send(err);
                } else {
                    res.send('Success');
                }
            }); 
            res.render('post', { likes: post.likes, postSubHeading: post.postSubHeading, postImage: post.postImage, postCategory: post.postCategory, postDate: post.postDate, postTitle: post.postTitle, postBody: post.postBody });
        }
    });
});

// Handle undefined routes
app.use(function(req, res, next) {
  res.status(404).render('error', {error: '404 - Page not found'});
});

// Handle errors
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).render('error', {error: '500 - Internal Server Error'});
});





app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port 3000");
});
