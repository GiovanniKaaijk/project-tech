const express = require('express')
const app = express()
const port = 5500

const bodyParser = require('body-parser')
const fetch = require('node-fetch');

const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;

require('dotenv').config()


// login request
app.use(bodyParser.urlencoded({extended: false}));

var data = [{
    name: 'test'
}];
app.post('/api/data', (request, response) => {
    const postBody = request.body;
    console.log(postBody);
    console.log(data)
    data.push(postBody)
    response.redirect('http://localhost:5500/')
  });
// multer

// Mongodb
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
   if(err){
       console.log(err)
   } else {
       console.log('Connected to mongodb')
   }
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});


// catimg
//placeholder while fetch is still loading
let imgsrc = 'https:\/\/purr.objects-us-east-1.dream.io\/i\/20160628_130711.jpg';
    
const randomCat = () => {
fetch('https://aws.random.cat/meow')
.then(res => res.json())
.then(json => {
    imgsrc = json.file; 
    });
};

//routes
app.set('view engine', 'pug')
app.get('/', function (req, res) {
    randomCat()
    res.render('index', {
        title: 'Home',
        message: '',
        file: imgsrc,
        data: data
    })
})

app.get('/about', function (req, res) {
    res.render('about', {
        title: '-',
        message: ''
    })
})
app.get('/login', function (req, res) {
    res.render('login', {
        title: '-',
        message: ''
    })
})


app.use(express.static('public'), function(req,res){
    res.status(404).render('404.pug', {
        title: '404 error',
        message: 'Page not found :('
    });
})

app.listen(port, () => console.log(`Server is gestart op poort: ${port}`))
