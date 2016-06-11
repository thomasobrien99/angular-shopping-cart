const express = require('express');
const app = express();
const bodyParser = require('body-parser')

const teas = require('./routes/teas');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json({extended:true}));

app.use('/js', express.static(__dirname+'/../client/js'));
app.use('/css', express.static(__dirname+'/../client/css'));
app.use('/partials', express.static(__dirname+'/../client/partials'));

app.use('/api/teas', teas)

app.use('*', function(req, res){

	res.sendFile('layout.html', {root:__dirname+'/../client/partials/'});

});

app.listen(3001, function(){
	console.log('Server is listening on port 3001');
})