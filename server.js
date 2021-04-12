'use stirct';


//#region  Dependencies
require('dotenv').config();

const express = require('express');

const pg = require('pg');

const cors = require('cors');

const superagent = require('superagent');

const override = require('method-override');

//#endregion


//#region Variables Area

let diff_string;

let diff_int;

const Q_number = 5;

let Q_counter = 0;

//#endregion


//#region  Setup
let app = express();

const PORT = process.env.PORT || 3005;

const DATABASE_URL = process.env.DATABASE_URL;

const client = new pg.Client(DATABASE_URL);

//#endregion


//#region Middlewares

app.use(express.urlencoded({ extended: true }));

app.use(express.static('./public'));

app.use(override('_method'));

app.use(cors());

app.set('view engine', 'ejs');

//#endregion


//#region Routes

// home Page Route
app.get('/', renderHomePage);

// gitting data from the home to the quiz page route
app.post('/quiz', handleQuiz);

// quiz page Route
app.get('/quiz', handleStart);

//
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


//#region client connection check

client.connect().then(() => {
    app.listen(PORT, () => {
        console.log('Connected to database:'); //show what database we connected to
        console.log(`Listening to Port ${PORT}`); //start point for the application"initialisation"
    });
});

client.on('error', error => console.error(error));

//#endregion


//#region Constructors Area

function Question(data){
    this.question = data.question;
    this.correct_answer = data.correct_answer;
    this.incorrect_answers = data.incorrect_answers;
    this.difficulty = data.difficulty;
}

//#endregion


//#region Functions/Handlers Area
function renderHomePage(req, res) {
    res.render('pages/index');
}

function handleQuiz (req,res){
    const userName = req.body.name;
    diff_string = req.body.difficulty;
    if (diff_string === 'easy') {
        diff_int = 1;
    } else if (diff_string === 'medium'){
        diff_int = 2;
    } else if (diff_string === 'hard'){
        diff_int = 3;
    }
    const values = [userName];
    const insertName= 'INSERT INTO users (name) VALUES($1) RETURNING id;';
    client.query(insertName,values).then(results => {res.redirect('/quiz');})
        .catch(error =>handleError(error,res));
}

function handleStart (req,res){
    // const diff = req.params.difficulty;
    // const selectDiff= `select difficulty  from quiz_difficulty  where id = ${diff};`;
    // console.log(selectDiff);
    const url = `https://opentdb.com/api.php?amount=${Q_number}&category=9&difficulty=${diff_string}&type=multiple`;
    superagent.get(url)
        .then(quiz => {
            console.log(quiz.body.results);
            let arr = quiz.body.results.map(ques => new Question(ques));
            let full_arr = [arr.correct_answer, arr.incorrect_answers];
            let flated_arr= full_arr.flat();
            let shuffiled_arr = shuffle(flated_arr);
            console.log(arr[0].question);
            res.render('pages/quiz-page',{data : shuffiled_arr, quest : arr[0].question});
        })
        .catch(error =>handleError(error,res));
}

function shuffle(arr) {
    let item = arr.length, temp, index;
    while (item > 0) {
        index = Math.floor(Math.random() * item) ;
        item--;
        temp = arr[item];
        arr[item] = arr[index];
        arr[index] = temp;
    }
    return arr;
}





//#endregion


//#region Error Handler

function handleError(error, res) {
    res.send({ status: 404, message: `Sorry something went wrong => ${error}` });
}

//#endregion
