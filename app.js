//jshint eversion-6
const express= require('express');
const bodyparser= require('body-parser');
const { application } = require('express');
const mongoose= require('mongoose')
mongoose.connect("mongodb+srv://root:root@cluster0.zaso0wp.mongodb.net/blogDB",{useNewUrlParser:true});
const app =express();
app.set('view engine', 'ejs');
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static("public"));
const home12="welcome to my blog may you have a great day ";
const about= "My name is Nishant Kumar .I like do coding";
const con= "In the footer section i have give my email id";
const BLOGschema =
    {
        title:String,
        content:String
    }

const BLOG =mongoose.model("BLOG",BLOGschema);

app.get("/",function(req,res){
    
    BLOG.find(function(err,blog)
    {
        if(err)
        {
            console.log(err);
        }
        else
        {
            res.render("index",{content:home12,title:"home",newblog:blog});
        }
        
    })
    
})
app.get("/about.ejs",function(req,res){
    res.render("about",{title:"About",content:about});
})

app.get("/index.ejs",function(req,res){
    //res.render("index",{content:home12,title:"home"});
    res.redirect("/");
})
app.get("/contact.ejs",function(req,res){
    res.render("contact",{title:"How to contact me",content:con});
})
app.get("/post.ejs",function(req,res){
    res.render("post");
})
app.post("/",function(req,res){

    const blo=new BLOG({
        title:req.body.posttitle,
        content:req.body.blog
    })
    blo.save();
    res.redirect("/");
})
app.get("/newblog/:postname",function(req,res)
{
    console.log(req.params.postname);
    
})

app.listen(3000,function(){
    console.log("server started");
})