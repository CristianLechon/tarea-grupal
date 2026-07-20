CREATE TABLE books
(
    isbn    VARCHAR(255) NOT NULL,
    title   VARCHAR(255),
    price   DECIMAL,
    version INTEGER,
    CONSTRAINT pk_books PRIMARY KEY (isbn)
);

insert into books (isbn, price, title, version) values ('9780747532743',24.99,'Harry Potter y la piedra filosofal',1);
insert into books (isbn, price, title, version) values ('9780747538493',26.99,'Harry Potter y la cámara secreta',1);
insert into books (isbn, price, title, version) values ('9780747542155',28.99,'Harry Potter y el prisionero de Azkaban',1);

insert into books (isbn, price, title, version) values ('9780553103540',35.99,'Juego de Tronos',1);
insert into books (isbn, price, title, version) values ('9780553108033',36.99,'Choque de Reyes',1);
insert into books (isbn, price, title, version) values ('9780553106633',38.99,'Tormenta de Espadas',1);

insert into books (isbn, price, title, version) values ('9780618260300',22.50,'El Hobbit',1);
insert into books (isbn, price, title, version) values ('9780618640157',29.99,'La Comunidad del Anillo',1);
insert into books (isbn, price, title, version) values ('9780618640188',29.99,'Las Dos Torres',1);

insert into books (isbn, price, title, version) values ('9780307474728',19.99,'Cien años de soledad',1);
insert into books (isbn, price, title, version) values ('9780307389732',18.50,'El amor en los tiempos del cólera',1);

insert into books (isbn, price, title, version) values ('9780307743657',21.99,'It',1);
insert into books (isbn, price, title, version) values ('9780307743664',20.99,'El resplandor',1);

insert into books (isbn, price, title, version) values ('9780553293357',17.99,'Fundación',1);
insert into books (isbn, price, title, version) values ('9780553293364',18.99,'Yo, Robot',1);