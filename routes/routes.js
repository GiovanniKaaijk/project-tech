function routes(){

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
}

exports.routes = routes();

