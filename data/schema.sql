DROP TABLE IF EXISTS Users, quiz_Difficulty, quiz_Result;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255)
);

CREATE TABLE quiz_Difficulty (
    id  SERIAL PRIMARY KEY,
    difficulty VARCHAR(255)
);

CREATE TABLE quiz_Result(
    User_id int,
    difficulty_id int,
    score int, 
    time VARCHAR(10)
);
