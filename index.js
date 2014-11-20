var express = require('express');

var app = express();

/* setup static routes */
app.use(express.static(__dirname + '/assets'));

/* host kissy library */
app.use('/kissy', express.static(__dirname + '/node_modules/kissy/build'));

/* setup views engine */
app.set('views', './assets/tpl');
app.set('view engine', 'xtpl');
app.set('view cache', false);


/* app routes */
app.get(/(\/|\/p\d+)$/, function(req, res) {
    res.render('index');
});

/* start server */
var server = app.listen(3000, function() {
    console.info('Server started, listening on port ' +
        server.address().port);
});


/*******************/

/*
var five = require('johnny-five');

function startBoard(name) {
    require('./arduino/' + name).start(board);
}

function stopBoard(name) {
    require('./arduino/' + name).stop(board);
}

app.get('/start', function(req, res) {
    startBoard('mix');
    res.sendStatus(200);
});

app.get('/stop', function(req, res) {
    stopBoard('mix');
    res.sendStatus(200);
});

board.on('ready', function() {
    console.log('Arduino started, starting Server...');
});
*/
