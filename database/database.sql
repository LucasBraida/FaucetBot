create database perntodo;
\c perntodo;
create table todo(
    todo_id serial primary key,
    description varchar(255)
)