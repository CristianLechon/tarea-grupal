CREATE TABLE inventory
(
    book_isbn VARCHAR(255) NOT NULL,
    sold      INTEGER,
    supplied  INTEGER,
    version   INTEGER,
    CONSTRAINT pk_inventory PRIMARY KEY (book_isbn)
);

ALTER TABLE inventory
    ADD CONSTRAINT FK_INVENTORY_ON_BOOK_ISBN FOREIGN KEY (book_isbn) REFERENCES books (isbn);

insert into inventory (book_isbn, sold, supplied, version) values ('9780132350884', 15, 50, 1);
insert into inventory (book_isbn, sold, supplied, version) values ('9780132126953', 8, 30, 1);
insert into inventory (book_isbn, sold, supplied, version) values ('9788408172178', 20, 40, 1);