'use strict';

$(document).ready(() => {
    let counter = 0;
    let correct_answer = $('input[name="answer"]').val();
    $(`.quiz_questions[data-number=0]`).show();
    $('.hiden-correct').hide();
    $('.questions').on('click', function (event){
        if($(this).val() === correct_answer){
            $(this).addClass('wrong');
        } else {
            counter += 1;
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
            $('.result').show();
        }
        $(`.quiz_questions[data-number=${index}]`).show();
    });
});



