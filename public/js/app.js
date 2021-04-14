'use strict';

function shuffle(arr) {
    let item = arr.length, temp, index;
    while (item > 0) {
        index = Math.floor(Math.random() * item);
        item--;
        temp = arr[item];
        arr[item] = arr[index];
        arr[index] = temp;
    }
    return arr;
}





let counter = 0;
let correct_answer = $('input[name="answer"]').val();

$(document).ready(() => {
    // $('.quiz_quistions').show();
    $(`.quiz_questions[data-number=0]`).show();

    $('.hiden-correct').hide();
    $('.questions').on('click', function (event){
        console.log(correct_answer);
        console.log($(this).val());
        if($(this).val() === correct_answer){
            $(this).addClass('correct');
            counter ++;
        } else {
            $(this).addClass('wrong');
        }
        $('.next_question').show();
    });
    $('.next_question').on('click', function (event){
        let index = parseInt(this.dataset.number);
        $(`.quiz_questions[data-number=${index}]`).hide();
        $('.next_question').hide();
        index++;
        if (parseInt(this.dataset.max) === index){
            $('#score').text(counter);
            $('.result').show();
        }
        $(`.quiz_questions[data-number=${index}]`).show();
    });
});




// var i = 0;
// function main() {
//     $.getJSON('https://opentdb.com/api.php?amount=10&category=9&difficulty=&type=multiple', (data => {
//         function go() {
//             var source = data;
//             localStorage.setItem('local', JSON.stringify(source));
//             var stored = JSON.parse(localStorage.getItem('local'));
//             console.log(stored);
//             do {
//                 var instance;
//                 var qa = [
//                     stored.results[i].correct_answer,
//                     stored.results[i].incorrect_answers['0'],
//                     stored.results[i].incorrect_answers['1'],
//                     stored.results[i].incorrect_answers['2']];
//                 instance = shuffle(qa);
//                 instance.unshift(stored.results[i].correct_answer);
//                 instance.unshift(stored.results[i].question);
//                 $('#question').html('');
//                 $('#question').html(instance[0]);
//                 $('#q1').html('').removeClass('correct').removeClass('wrong');
//                 $('#q2').html('').removeClass('correct').removeClass('wrong');
//                 $('#q3').html('').removeClass('correct').removeClass('wrong');
//                 $('#q4').html('').removeClass('correct').removeClass('wrong');
//                 $('#q1').html(instance[2]);
//                 $('#q2').html(instance[3]);
//                 $('#q3').html(instance[4]);
//                 $('#q4').html(instance[5]);
//                 $('.questions').off().click(function () {
//                     var answer = $(this).html();
//                     if (answer === instance[1]) {
//                         $(this).addClass('correct');
//                         setTimeout(go, 900);
//                     } else {
//                         $(this).addClass('wrong');
//                         $(`.questions:contains(${instance[1]})`).addClass('correct');
//                         setTimeout(go, 1100);
//                     }
//                 });
//                 i++;
//             } while (i < stored.length);

//         } go();
//     }));
// }
// main();

// let timer = $('#timer').innerText, score = 0, final;


// function startQuiz() {
//     timer = 0;
//     setTimeout(() => {
//         final = quizTimer();
//     }, 500);
//     timer.innerText = final;
// }
// function quizTimer() {
//     return setInterval(() => {
//         final++;
//         timer.innerText = final;
//     }, 1000);
// }


