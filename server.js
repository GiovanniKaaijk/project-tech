const express = require('express')
const app = express()
const port = 5500

// login request
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: false}));

app.post('/api/data', (request, response) => {
    const postBody = request.body;
    console.log(postBody);
    
    response.render('index', {
        title: '-',
        message: '',
        name: postBody.name,
        tumbnail: postBody.tumbnail
    })
  });

// cat image
const fetch = require('node-fetch');
let imgsrc = '';
const randomCat = () => {
    fetch('https://aws.random.cat/meow')
    .then(res => res.json())
    .then(json => {
        imgsrc = json.file; 
      });
    };
randomCat()


//routes
app.set('view engine', 'pug')
app.get('/', function (req, res) {
    res.render('index', {
        title: 'Home',
        message: '',
        file: imgsrc
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
