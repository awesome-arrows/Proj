'use strict';

$(document).ready(() => {
    let counter = 0;
    $(`.quiz_questions[data-number=0]`).show();
    $('.hiden-correct').hide();
    $('.questions').on('click', function (event){
        let correct_answer = $('input[name="answer"]').val();
        if($(this).val() === correct_answer){
            $(this).addClass('wrong');
            counter += 1;
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
            $('.result').show();
        }
        $(`.quiz_questions[data-number=${index}]`).show();
    });
});

