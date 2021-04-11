insert into users (name) values ('1111');
insert into users (name) values ('2222');
insert into users (name) values ('333');
insert into users (name) values ('4444');
insert into users (name) values ('55555');
insert into users (name) values ('66666');

insert into quiz_Difficulty (difficulty) values ('easy');
insert into quiz_Difficulty (difficulty) values ('medium');
insert into quiz_Difficulty (difficulty) values ('hard');


insert into quiz_Result (User_id, difficulty_id, score, time)
values (1, 1, 10, '110:2');
insert into quiz_Result (User_id, difficulty_id, score, time)
values (2, 2, 10, '220:2');
insert into quiz_Result (User_id, difficulty_id, score, time)
values (2, 3, 10, '20:2');
insert into quiz_Result (User_id, difficulty_id, score, time)
values (3, 1, 10, '10:20');
insert into quiz_Result (User_id, difficulty_id, score, time)
values (1, 2, 10, '100:2');
