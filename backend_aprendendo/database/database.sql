create database firstapi;

create table users (
    id serial primary key,
    name varchar(128),
    email varchar(1024)
);

insert into users (name, email) values
    ('joe', 'joe@ibm.com'),
    ('ryan', 'ryan@faztweb.com')
;