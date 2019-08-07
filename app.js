const app = require("express")();
var http = require('http').createServer(app);
const {port} = require('./config');
const path = require('path');
const chat = require("./chat");

//chat
chat.chat(http);

const bodyParser = require('body-parser');
app.use(bodyParser.json()); 

app.set('view engine','ejs');
app.set('views',path.join(__dirname, 'views'));


/*
app.use(express.static('public'));
*/

const room = require("./routes/room")

app.use('/room',room);

// rest of endpoints
app.get('*', function(req, res, next){
    next(new Error('Just /room works'));
})

//error handler
app.use(function(err, req, res, next){
    console.log(`An error occurred: ${err}`);
    return res.status(500).send(`${err}`);
});

http.listen(port, function() {
    console.log('Server listening on http://localhost:' + port);
});