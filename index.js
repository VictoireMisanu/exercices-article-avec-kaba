const express = require("express");
const mainApp = express()

const articles = require("./data/db.json");
mainApp.set("view engine", "ejs");
mainApp.set("views", __dirname + "/views");
mainApp.use(express.static(__dirname + "/public"));
mainApp.use(express.json());


mainApp.get("/", function (req, res){
    res.render("articles", {articles})
})

mainApp.get("/articles/:slug", function(req, res){
    const { slug } = req.params;
    const article = articles.find((article) => article.slug === slug)
    if(article){
        res.render("article", {article})
    }

})

mainApp.get("/ajouter", (req, res)=>{
    res.render("ajouter")
});
mainApp.get("/*", function(req,res){
    res.render("404")
});


const port = 3000

mainApp.listen(port, ()=>{
    console.log(`http://localhost:${port}`)
})