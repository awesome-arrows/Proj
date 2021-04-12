'use stirct';


//#region  Dependencies
require('dotenv').config();

const express = require('express');

const pg = require('pg');

const cors = require('cors');

const superagent = require('superagent');
const DATABASE_URL = process.env.DATABASE_URL;
const override = require('method-override');
const client = new pg.Client(DATABASE_URL);
//#endregion


//#region Variables Area


//#endregion


//#region  Setup
let app = express();

const PORT = process.env.PORT || 5555;

// const DATABASE_URL = process.env.DATABASE_URL;

// const user = new pg.Client(DATABASE_URL);

//#endregion


//#region Middlewares

// user.connect();

// user.on('error', error => console.error(error));

app.use(express.urlencoded({ extended: true }));

app.use(express.static('./public'));

app.use(override('_method'));

app.use(cors());

app.set('view engine', 'ejs');

//#endregion
client.connect().then(() => {
    app.listen(PORT, () => {
        console.log('Connected to database:', client.connectionParameters.database); //show what database we connected to
        console.log(`Listening to Port ${PORT}`); //start point for the application"initialisation"
    });
});

//#region Routes

// home Page Route
// app.get('/', renderHomePage);


// //


// //
// app.post('/quiz', handleQuiz);

// //
// app.get('/quiz', handleStart);


//
app.get('/tttt', handleQuiz);

//
// app.post('/', handleResult);

// // Update Route
// app.put('//:', handleUpdate);

// // Posting Update Route
// app.post('//:', handleUpdate);

// // delettion Route
// app.delete('//:', handleDelete);

// Route not found
app.get('*', handleError);

//#endregion


function Quiz(){

}


function handleQuiz(req, res){

    res.render('pages/quiz-page');



}


function handleError(error, res) {
    res.render('pages/error', { status: 404, message: `Sorry something went wrong => ${error}` });
}
