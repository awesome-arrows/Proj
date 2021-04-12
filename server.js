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
let diff_string;
let diff_int;


//#endregion


//#region  Setup
let app = express();

const PORT = process.env.PORT || 3005;

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
        console.log('Connected to database:'); //show what database we connected to
        console.log(`Listening to Port ${PORT}`); //start point for the application"initialisation"
    });
});

client.on('error', error => console.error(error));
// app.listen(PORT, () => {
//     console.log(`the app is listening to => ${PORT}`);
// });

//#region Constructors Area

function Question(data){
    this.question= data.question;
    this.correct_answer= data.correct_answer;
    this.incorrect_answers=data.incorrect_answers;
    this.difficulty=data.difficulty;
}



//#endregion


//#region Functions/Handlers Area
function renderHomePage(req, res) {
    console.log('homepage is rendering');
    res.render('pages/index');
}


function handleQuiz (req,res){
    // console.log(req.body);
    const userName = req.body.name;
    diff_string=req.body.difficulty;
    
    console.log(diff_string);
    if (diff_string === 'easy') {
        diff_int = 1;
    } else if (diff_string === 'medium'){
        diff_int = 2;
    } else if (diff_string === 'hard'){
        diff_int = 3;
    }
    const values = [userName];
    const insertName= 'INSERT INTO users (name) VALUES($1) RETURNING id ;';
    client.query(insertName,values).then(results=>{ res.redirect('/quiz');})
    .catch(error =>handleError(error,res));
}

function handleStart (req,res){
    // const diff = req.params.difficulty;
    console.log('I am start');
    // const selectDiff= `select difficulty  from quiz_difficulty  where id = ${diff};`;

    // console.log(selectDiff);
    const url = `https://opentdb.com/api.php?amount=15&category=9&difficulty=${diff_string}&type=multiple`;
    superagent.get(url)
        .then(quiz =>{
            console.log(quiz.body.results);
            let arr = quiz.body.results.map(ques => new Question(ques));
            res.render('pages/quiz-page',{data : arr});
        })
        .catch(error =>handleError(error,res));
}

//#endregion


//#region Error Handler

function handleError(error, res) {
    res.send({ status: 404, message: `Sorry something went wrong => ${error}` });
}

//#endregion
