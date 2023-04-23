const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const { application } = require("express");
const mongoose = require("mongoose");
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

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
// Define admin schema
const adminSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true }
});

const Admin = mongoose.model("Admin", adminSchema);

// Configure passport local strategy for admin login
passport.use(new LocalStrategy((username, password, done) => {
  Admin.findOne({ username: username })
    .then((admin) => {
      if (!admin) { return done(null, false, { message: 'Incorrect username.' }); }
      bcrypt.compare(password, admin.password, (err, res) => {
        if (res) {
          return done(null, admin);
        } else {
          return done(null, false, { message: 'Incorrect password.' });
        }
      });
    })
    .catch((err) => { return done(err); });
}));


passport.serializeUser((admin, done) => {
  done(null, admin.id);
});

passport.deserializeUser((id, done) => {
  Admin.findById(id).then(function(user) {
    done(null, user);
  }).catch(function(err) {
    done(err, null);
  });
});
  

// Use passport session middleware
app.use(require('express-session')({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// Middleware to check if user is authenticated
function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/admin/login');
}

app.get("/", (req, res) => {
  res.render('home')
});

app.get("/admin/dashboard", isAuthenticated, (req, res) => {
  res.render('admin/dashboard')
});

app.get('/admin/login', (req, res) => {
  const errorMessage = 'Invalid username or password';
  res.render('admin/login', { errorMessage });
});


app.post("/admin/login", passport.authenticate('local', { failureRedirect: '/admin/login' }), (req, res) => {
  res.redirect('/admin/dashboard');
});

app.get('/admin/logout', function(req, res){
  req.logout(function(){});
  res.redirect('/admin/logout');
});

app.get("/blog/post/:postTitle", (req, res) => {
  const requestedTitle = req.params.postTitle;
  Post.findOne({ postTitle: requestedTitle })
      .then(post => {
          if (post) {
              res.render('post', { postSubHeading: post.postSubHeading, postImage: post.postImage, postCategory: post.postCategory, postDate: post.postDate, postTitle: post.postTitle, postBody: post.postBody });
          } else {
              res.send('Post not found');
          }
      })
      .catch(err => {
          res.send(err);
      });
});

app.get("/blogs", async (req, res) => {
  const search = req.query.search;
  const page = parseInt(req.query.page) || 1;
  const limit = 4;
  const skip = (page - 1) * limit;
  try {
    let posts, count;
    if (search) {
      const regex = new RegExp(search, "i");
      [posts, count] = await Promise.all([
        Post.find({ postTitle: regex }, null, { sort: "-postDate" })
          .skip(skip)
          .limit(limit)
          .exec(),
        Post.countDocuments({ postTitle: regex }).exec(),
      ]);
    } else {
      [posts, count] = await Promise.all([
        Post.find({}, null, { sort: "-postDate" })
          .skip(skip)
          .limit(limit)
          .exec(),
        Post.countDocuments().exec(),
      ]);
    }
    const totalPages = Math.ceil(count / limit);
    res.render("blogs", { posts, totalPages });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
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

// Add middleware to check if user is authenticated
function requireAuth(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/admin/login');
}

// Add middleware to set the user in the response locals for all routes
function setUserInLocals(req, res, next) {
  res.locals.user = req.user;
  next();
}

// Apply middleware to all routes
app.use(setUserInLocals);

// Routes that require authentication
app.get('/admin/compose', requireAuth, (req, res) => {
  res.render('admin/compose');
});
app.post("/admin/compose", requireAuth, (req, res) => {
  //{postTitle: req.body.postTitle, postBody: req.body.postBody}
  const post = new Post({
    postTitle: req.body.postTitle,
    postSubHeading: req.body.postSubHeading,
    postBody: req.body.postBody,
    postCategory: req.body.postCategory,
    postImage: req.body.postImage,
    postDate: req.body.postDate
  });

  post.save()
    .then(() => {
      res.redirect("/blogs");
    })
    .catch(err => {
      console.error(err);
      res.sendStatus(500);
    });
});

app.get("/admin/list-edit", requireAuth, (req, res) => {
  var search = req.query.search;
  var page = parseInt(req.query.page) || 1;
  var limit = 4;
  var skip = (page - 1) * limit;
  if(search){
    var regex = new RegExp(search, 'i');
    Post.find({ postTitle: regex }, null, {sort: '-postDate'}).skip(skip).limit(limit).then(posts => {
      return Post.countDocuments({ postTitle: regex }).then(count => {
        var totalPages = Math.ceil(count / limit);
        res.render("admin/list-edit", { posts: posts, totalPages: totalPages });
      });
    }).catch(err => {
      console.log(err);
      res.send("Error fetching posts");
    });
  }else{
    Post.find({}, null, {sort: '-postDate'}).skip(skip).limit(limit).then(posts =>{
      return Post.countDocuments().then(count => {
        var totalPages = Math.ceil(count / limit);
        res.render("admin/list-edit", { posts: posts, totalPages: totalPages });
      });
    }).catch(err => {
      console.log(err);
      res.send("Error fetching posts");
    });
  }
});

// Use async/await consistently for better readability
app.get('/admin/edit/:postTitle', requireAuth, async (req, res) => {
  try {
    const requestedTitle = req.params.postTitle;
    const post = await Post.findOne({ postTitle: requestedTitle });

    if (post) {
      res.render('admin/edit', { post: post });
    } else {
      res.send('Post not found');
    }
  } catch (err) {
    // Consider using a more descriptive error message or rendering an error page
    res.send('Error fetching post');
  }
});

app.post("/admin/edit/:postTitle", requireAuth, async (req, res) => {
  try {
    const requestedTitle = req.params.postTitle;
    const updatedPost = {
      postTitle: req.body.postTitle,
      postSubHeading: req.body.postSubHeading,
      postBody: req.body.postBody,
      postCategory: req.body.postCategory,
      postImage: req.body.postImage,
      postDate: req.body.postDate
    };
    // Use findOneAndUpdate() instead of findAndUpdate() for consistency with findOne()
    const post = await Post.findOneAndUpdate(
      { postTitle: requestedTitle },
      updatedPost,
      { new: true }
    );
    
    if (post) {
      // Redirect to the post URL after updating
      res.redirect(`/blog/post/${post.postTitle}`);
    } else {
      res.send('Post not found');
    }
  } catch (err) {
    // Consider using a more descriptive error message or rendering an error page
    res.send('Error updating post');
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
