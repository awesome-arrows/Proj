'use strict';

function getRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

$(document).ready(() => {
    let counter =getRandom(1,5);
    let timer=getRandom(15,30);
    let correct_answer = $('input[name="answer"]').val();
    $(`.quiz_questions[data-number=0]`).show();
    $('.hiden-correct').hide();
    $('.questions').on('click', function (event){
        if($(this).val() === correct_answer){
            $(this).addClass('wrong');
        } else {
            $(this).addClass('answer');
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
            $('#time').text(timer);
            $('.result').show();
            $('input[name="time"]').val(timer) ;
            $('input[name="score"]').val(counter) ;
        }
        $(`.quiz_questions[data-number=${index}]`).show();
    });
});

