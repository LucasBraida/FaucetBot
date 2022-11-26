create database lw3faucet;
\c lw3faucet;
create table userinfo
(
    id serial primary key,
    wallet varchar(255) not null unique,
    ftethgoerli timestamp,
    ftlinkgoerli timestamp,
    ftmaticmumbai timestamp,
    ftlinkmumbai timestamp,
    ftceloalfajores timestamp   
);