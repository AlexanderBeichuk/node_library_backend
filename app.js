const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const config = require('./config/database');
const library = require('./controllers/bookController');

mongoose.connect(config.database);

const app = express();

const port = 3000;

app.use(cors());

app.use(bodyParser.urlencoded({
	extended: true
}));

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (request ,response) => {
   response.send('Invalid page');
});

app.use('/mifort_library', library);

app.listen(port, () => {
   console.log(`Starting the server at port ${port}.`);
	console.info(`\nlocalhost:${port}/mifort_library\n`);
});

