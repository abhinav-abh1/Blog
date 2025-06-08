const express = require('express');
const mongoose = require("mongoose");
const Article = require("./models/article")
const articleRouter = require('./routes/articles');
const methodOverride = require("method-override")
const app = express();
mongoose.connect("mongodb://localhost/blog",{useNewUrlParser:true, useUnifiedTopology:true });



app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: false}))
app.use(methodOverride("_method"))

app.get ('/', async (req, res) => {
    const articles = await Article.find().sort({
        date: "desc"})
    res.render('articles/index', { articles: articles });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

app.use("/articles", articleRouter);