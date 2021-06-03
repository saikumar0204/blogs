var express= require('express')
var router= express.Router()
var mongoose = require('mongoose')
var moment = require('moment')
mongoose.connect("mongodb+srv://saikumar0204:Sai12345@cluster0.idkbo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",{
  useNewUrlParser:true,
  useUnifiedTopology:true
  
})

mongoose.connection.on('connected',()=>{
  // console.log("connnected to mongoose");
})

var articleSchema= new mongoose.Schema({
  title:String,
  time:String,
  body:String
})

var article= mongoose.model('article',articleSchema)

router.get('/',(req,res)=>{
  article.find({},function(err,data){
    if(err) console.log(err)
    else res.render('home',{articles:data})
  })
  

})

router.get('/edit',(req,res)=>{
  var data ={}
  res.render('edit',{data:data})
})

router.get('/edit/:id',(req,res)=>{
  article.find({_id:req.params.id},function(err,data){
    if(err) console.log(err)
    else res.render('edit',{data:data[0]})
  })
  
})

router.post('/edit',(req,res)=>{
  var value={
    title:req.body.title,
    time: moment().format('MMMM Do YYYY, h:mm:ss a'),
    body:req.body.body
  }
  var newArticle= article(value).save((err,data)=>{
    if(err) console.log(err)
    else   res.redirect('/articles')
  })

})

router.get('/:id',(req,res)=>{
  article.deleteOne({_id:req.params.id})
  .then(()=>{
    
    res.redirect('/articles')
  })
  .catch((e)=>{
    console.log("Error is at this point 5")
  })
  
})
module.exports= router
