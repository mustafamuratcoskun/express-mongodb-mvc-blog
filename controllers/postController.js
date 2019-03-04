const Post = require("../models/Post");
const validateForm = (title, body) => {
  const errors = [];
  if (title === "") {
    errors.push({ message: "Please fill the title area" });
  }
  if (body === "") {
    errors.push({ message: "Please fill the body area" });
  }
  return errors;
};
module.exports.getAllPosts = (req, res, next) => {
  Post.find({})
    .sort({
      createdAt: "desc"
    })
    .then(posts => {
      res.render("pages/index", {
        posts
      });
    })
    .catch(err => console.log(err));
};
module.exports.getAddPost = (req, res, next) => {
  res.render("posts/addPost");
};
module.exports.getEditPost = (req, res, next) => {
  const id = req.params.id;

  Post.findById({
    _id: id
  }).then(post => {
    console.log(post.title);
    res.render("posts/editPost", { post: post });
  });
};
module.exports.getDeletePost = (req, res, next) => {
  const id = req.params.id;

  Post.findById({
    _id: id
  })
    .remove()
    .then(() => {
      console.log("Successfully Deleted");
      req.flash("success", "Successfully Deleted");
      res.redirect("/");
    })
    .catch(err => console.log(err));
};
module.exports.postAddPost = (req, res, next) => {
  const title = req.body.title;
  const body = req.body.body;
  const errors = validateForm(title, body);

  if (errors.length > 0) {
    console.log(errors);
    return res.render("posts/addPost", { errors });
  }

  const newPost = Post({
    title,
    body
  });
  newPost
    .save()
    .then(() => {
      req.flash("success", "Successfully Added");
      res.redirect("/");
    })
    .catch(err => {
      console.log(err);
      res.redirect("/");
    });
};
module.exports.postEditPost = (req, res, next) => {
  const id = req.body.id;
  const newTitle = req.body.title;
  const newBody = req.body.body;
  const errors = validateForm(newTitle, newBody);

  if (errors.length > 0) {
    console.log(errors);
    return res.render("posts/editPost", { errors });
  }
  Post.findById({
    _id: id
  }).then(post => {
    console.log(post.title);
    post.title = newTitle;
    post.body = newBody;

    post
      .save()
      .then(() => {
        console.log("Successfully Updated");

        req.flash("success", "Successfully Updated");

        res.redirect("/");
      })
      .catch(err => console.log(err));
  });
};
