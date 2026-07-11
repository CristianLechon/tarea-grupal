INSERT INTO customers (first_name, last_name, email, phone, address, created_at)
VALUES ('Ana', 'Torres', 'ana.torres@example.com', '0991234567', 'Av. Amazonas N34-100, Quito', now())
ON CONFLICT (email) DO NOTHING;

INSERT INTO customers (first_name, last_name, email, phone, address, created_at)
VALUES ('Luis', 'Perez', 'luis.perez@example.com', '0987654321', 'Av. 6 de Diciembre, Quito', now())
ON CONFLICT (email) DO NOTHING;

INSERT INTO customers (first_name, last_name, email, phone, address, created_at)
VALUES ('Maria', 'Gonzalez', 'maria.gonzalez@example.com', '0976543210', 'Calle Larga, Cuenca', now())
ON CONFLICT (email) DO NOTHING;

INSERT INTO customers (first_name, last_name, email, phone, address, created_at)
VALUES ('Carlos', 'Vega', 'carlos.vega@example.com', '0965432109', 'Malecon 2000, Guayaquil', now())
ON CONFLICT (email) DO NOTHING;

INSERT INTO customers (first_name, last_name, email, phone, address, created_at)
VALUES ('Sofia', 'Ramirez', 'sofia.ramirez@example.com', '0954321098', 'Av. Amazonas, Ambato', now())
ON CONFLICT (email) DO NOTHING;
