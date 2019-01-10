const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const config = require('./config/database');
const bookController = require('./controllers/bookController');
const userController = require('./controllers/userController');

mongoose.connect(config.database);

const app = express();

const port = 3000;

app
   .use(cors())
   .use(bodyParser.urlencoded({
	   extended: true
   }))
   .use(bodyParser.json())
   .use(express.static(path.join(__dirname, 'public')))
   .get('/', (request ,response) => {
      response.send('Invalid page');
   })

   .use('/mifort_library', bookController)
   .use('/mifort_library', userController)

   .listen(port, () => {
      console.log(`Starting the server at port ${port}.`);
      console.info(`\nlocalhost:${port}/mifort_library\n`);
   });

