CREATE TABLE book_author
(
    books_isbn VARCHAR(255) NOT NULL,
    authors_id INTEGER      NOT NULL,
    CONSTRAINT pk_book_author PRIMARY KEY (books_isbn, authors_id)
);

ALTER TABLE book_author
    ADD CONSTRAINT FK_BOOK_AUTHOR_ON_AUTHORS FOREIGN KEY (authors_id) REFERENCES authors (id);

insert into book_author (books_isbn, authors_id) values ('9780747532743',1);
insert into book_author (books_isbn, authors_id) values ('9780747538493',1);
insert into book_author (books_isbn, authors_id) values ('9780747542155',1);

insert into book_author (books_isbn, authors_id) values ('9780553103540',2);
insert into book_author (books_isbn, authors_id) values ('9780553108033',2);
insert into book_author (books_isbn, authors_id) values ('9780553106633',2);

insert into book_author (books_isbn, authors_id) values ('9780618260300',3);
insert into book_author (books_isbn, authors_id) values ('9780618640157',3);
insert into book_author (books_isbn, authors_id) values ('9780618640188',3);

insert into book_author (books_isbn, authors_id) values ('9780307474728',4);
insert into book_author (books_isbn, authors_id) values ('9780307389732',4);

insert into book_author (books_isbn, authors_id) values ('9780307743657',5);
insert into book_author (books_isbn, authors_id) values ('9780307743664',5);

insert into book_author (books_isbn, authors_id) values ('9780553293357',6);
insert into book_author (books_isbn, authors_id) values ('9780553293364',6);