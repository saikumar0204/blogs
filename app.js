var express= require('express')
var app = express()
var port= process.env.PORT||4000
var articlesRouter= require('./controllers/articles')
app.set('view engine','ejs')

app.use(express.static('./public'))

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use('/articles',articlesRouter)



app.listen(port)
// console.log("Server running on ",port);
