CREATE TABLE books
(
    isbn    VARCHAR(255) NOT NULL,
    title   VARCHAR(255),
    price   DECIMAL,
    version INTEGER,
    CONSTRAINT pk_books PRIMARY KEY (isbn)
);

insert into books (isbn, price, title, version) values ('9780132350884', 10.99, 'Clean Code', 1);
insert into books (isbn, price, title, version) values ('9780132126953', 16.45, 'Computer Networks', 1);
insert into books (isbn, price, title, version) values ('9788408172178', 15.25, 'La sombra del viento', 1);