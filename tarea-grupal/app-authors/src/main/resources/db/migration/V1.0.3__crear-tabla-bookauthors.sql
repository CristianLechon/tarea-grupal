CREATE TABLE book_author
(
    books_isbn VARCHAR(255) NOT NULL,
    authors_id INTEGER      NOT NULL,
    CONSTRAINT pk_book_author PRIMARY KEY (books_isbn, authors_id)
);

ALTER TABLE book_author
    ADD CONSTRAINT FK_BOOK_AUTHOR_ON_AUTHORS FOREIGN KEY (authors_id) REFERENCES authors (id);

insert into book_author (books_isbn, authors_id) values ('9780132350884', 1);
insert into book_author (books_isbn, authors_id) values ('9780132126953', 2);
insert into book_author (books_isbn, authors_id) values ('9780132350884', 3);
insert into book_author (books_isbn, authors_id) values ('9780132126953', 1);