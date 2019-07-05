require('dotenv').config()
const db = require('./models/index')
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');
const exphbs = require('express-handlebars');
const customauthmiddleware = require('./middleware/custom-auth-middleware');
//directory references 
const clientDir = path.join(__dirname, '../client');

//set up the express app
const app = express();
const port = process.env.PORT || 8080;

//Express middleware that allows posting data
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(customauthmiddleware);

//serve up the public folder so we can request static assets from the client
app.use(express.static(`${clientDir}/public`));

//start the express server
db.sequelize.sync({ force: true}).then(() => {
    app.listen(port, () => {
        console.log(`app listening on port ${port}`);
    });
});
