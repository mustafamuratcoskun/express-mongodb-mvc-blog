const express = require("express");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const session = require("express-session");
const flash = require("connect-flash");
const pagesRouter = require("./routes/pages");
const postsRouter = require("./routes/posts");

const app = express();
const PORT = 5000;

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride("_method"));

app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: "miniblog"
  })
);
app.use(flash());
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  console.log(res.locals.success);
  res.locals.error = req.flash("error");
  next();
});

// Routes MiddleWare
app.use(pagesRouter);
app.use(postsRouter);

// MongoDb Connection
mongoose
  .connect("mongodb://localhost/miniblog", {
    useNewUrlParser: true
  })
  .then(() => {
    console.log("Connection Successful");
  })
  .catch(() => {
    console.log("Connection Failed");
  });

app.use((req, res, next) => {
  res.status(404).render("pages/404");
});
app.listen(PORT, () => console.log("App Started"));
