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


//#region Routes

// home Page Route
app.get('/', renderHomePage);


// //


// //
app.post('/quiz', handleQuiz);

// //
app.get('/quiz', handleStart);

// app.post('/', handle);

// //
// app.get('//:id', handle);

// // Update Route
// app.put('//:', handleUpdate);

// // Posting Update Route
// app.post('//:', handleUpdate);

// // delettion Route
// app.delete('//:', handleDelete);

// Route not found
app.get('*', handleError);

//#endregion

client.connect().then(() => {
    app.listen(PORT, () => {
        console.log('Connected to database:', client.connectionParameters.database); //show what database we connected to
        console.log(`Listening to Port ${PORT}`); //start point for the application"initialisation"
    });
});
// app.listen(PORT, () => {
//     console.log(`the app is listening to => ${PORT}`);
// });

//#region Constructors Area





//#endregion


//#region Functions/Handlers Area
function renderHomePage(req, res) {
    console.log('homepage is rendering');
    res.render('pages/index.ejs');
}


function handleQuiz (req,res){
    console.log(req.body);
    const userName = req.body.name;
    // const { title, author, isbn, image, description, bookshelf } = req.body;
    const sqlQuery = 'INSERT INTO users (name) VALUES($1) RETURNING id;';
    const safeValues = [name];
    res.redirect('pages/quiz-page.ejs');
    // res.send(req.body);
}

function handleStart (req,res){
    console.log('from form', req.body);
    res.render('pages/quiz-page.ejs');
}

//#endregion


//#region Error Handler

function handleError(error, res) {
    res.render('pages/error', { status: 404, message: `Sorry something went wrong => ${error}` });
}

//#endregion
