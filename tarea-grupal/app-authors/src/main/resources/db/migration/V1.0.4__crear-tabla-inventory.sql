CREATE TABLE IF NOT EXISTS inventory
(
    book_isbn VARCHAR(255) NOT NULL,
    sold      INTEGER,
    supplied  INTEGER,
    version   INTEGER,
    CONSTRAINT pk_inventory PRIMARY KEY (book_isbn)
);

ALTER TABLE inventory
    ADD CONSTRAINT IF NOT EXISTS fk_inventory_on_book
    FOREIGN KEY (book_isbn) REFERENCES books (isbn);

INSERT INTO inventory (book_isbn, sold, supplied, version)
SELECT '9780132350884', 5, 20, 1
WHERE NOT EXISTS (SELECT 1 FROM inventory WHERE book_isbn = '9780132350884');

INSERT INTO inventory (book_isbn, sold, supplied, version)
SELECT '9780132126953', 3, 15, 1
WHERE NOT EXISTS (SELECT 1 FROM inventory WHERE book_isbn = '9780132126953');

INSERT INTO inventory (book_isbn, sold, supplied, version)
SELECT '9788408172178', 8, 25, 1
WHERE NOT EXISTS (SELECT 1 FROM inventory WHERE book_isbn = '9788408172178');
