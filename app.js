//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const { application } = require("express");
const mongoose = require("mongoose");

const homeStartingContent = "";
const aboutContent = "";
const contactContent = "";

const app = express();
app.locals._ = _

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
mongoose.connect("mongodb+srv://vidvattaDB:vidvattaDBexample@cluster0.1tzcp2l.mongodb.net/vidvatta?retryWrites=true&w=majority", {useNewUrlParser: true});

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

app.get("/admin/compose", (req, res) => {
  res.render('admin/compose')
})

app.post("/admin/compose", (req, res) => {
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
      res.redirect("/blogs");
    }
  });
})

app.get("/blog/post/:postTitle", (req, res) => {
    const requestedTitle = req.params.postTitle;
    Post.findOne({ postTitle: requestedTitle }, (err, post) => {
        if (err) {
            res.send(err);
        } else {
            if (post) {
                res.render('post', { postSubHeading: post.postSubHeading, postImage: post.postImage, postCategory: post.postCategory, postDate: post.postDate, postTitle: post.postTitle, postBody: post.postBody });
            } else {
                res.send('Post not found');
            }
        }
    });
});

app.get("/admin/edit/:postTitle", (req, res) => {
  const requestedTitle = req.params.postTitle;
  Post.findOne({ postTitle: requestedTitle }, (err, post) => {
    if (err) {
      res.send(err);
    } else {
      if (post) {
        res.render('admin/edit', { post: post });
      } else {
        res.send('Post not found');
      }
    }
  });
});

app.post("/admin/edit/:postTitle", (req, res) => {
  const requestedTitle = req.params.postTitle;
  Post.findOneAndUpdate(
    { postTitle: requestedTitle },
    {
      postTitle: req.body.postTitle,
      postSubHeading: req.body.postSubHeading,
      postBody: req.body.postBody,
      postCategory: req.body.postCategory,
      postImage: req.body.postImage,
      postDate: req.body.postDate
    },
    { new: true },
    (err, post) => {
      if (err) {
        res.send(err);
      } else {
        if (post) {
          res.redirect(`/blog/post/${post.postTitle}`);
        } else {
          res.send('Post not found');
        }
      }
    }
  );
});

app.get("/admin/list-edit", (req, res) => {
  var search = req.query.search;
  var page = parseInt(req.query.page) || 1;
  var limit = 4;
  var skip = (page - 1) * limit;
  if(search){
    var regex = new RegExp(search, 'i');
    Post.find({ postTitle: regex }, null, {sort: '-postDate'}).skip(skip).limit(limit).exec((err, posts) =>{
      Post.countDocuments({ postTitle: regex }).exec(function(err, count) {
        var totalPages = Math.ceil(count / limit);
        res.render("admin/list-edit", { posts: posts, totalPages: totalPages });
      });
    });
  }else{
    Post.find({}, null, {sort: '-postDate'}).skip(skip).limit(limit).exec((err, posts) =>{
      Post.countDocuments().exec(function(err, count) {
        var totalPages = Math.ceil(count / limit);
        res.render("admin/list-edit", { posts: posts, totalPages: totalPages });
      });
    });
  }
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
