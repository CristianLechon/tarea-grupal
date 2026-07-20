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

insert into inventory (book_isbn, sold, supplied, version) values ('9780747532743',120,200,1);
insert into inventory (book_isbn, sold, supplied, version) values ('9780747538493',95,180,1);
insert into inventory (book_isbn, sold, supplied, version) values ('9780747542155',90,170,1);

insert into inventory (book_isbn, sold, supplied, version) values ('9780553103540',70,120,1);
insert into inventory (book_isbn, sold, supplied, version) values ('9780553108033',65,110,1);
insert into inventory (book_isbn, sold, supplied, version) values ('9780553106633',55,100,1);

insert into inventory (book_isbn, sold, supplied, version) values ('9780618260300',140,220,1);
insert into inventory (book_isbn, sold, supplied, version) values ('9780618640157',110,190,1);
insert into inventory (book_isbn, sold, supplied, version) values ('9780618640188',100,180,1);

insert into inventory (book_isbn, sold, supplied, version) values ('9780307474728',85,140,1);
insert into inventory (book_isbn, sold, supplied, version) values ('9780307389732',60,100,1);

insert into inventory (book_isbn, sold, supplied, version) values ('9780307743657',130,210,1);
insert into inventory (book_isbn, sold, supplied, version) values ('9780307743664',105,180,1);

insert into inventory (book_isbn, sold, supplied, version) values ('9780553293357',75,130,1);
insert into inventory (book_isbn, sold, supplied, version) values ('9780553293364',68,120,1);