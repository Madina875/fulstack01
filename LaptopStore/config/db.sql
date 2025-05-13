-- Active: 1745582598363@@127.0.0.1@3306@laptopstore

-- drop TABLE laptops;
-- drop TABLE brands;
SHOW TABLES;

CREATE TABLE `laptops`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(50) NOT NULL,
    `category_id` INT NOT NULL,
    `photo_id` VARCHAR(100) NOT NULL,
    `brand_id` INT NOT NULL,
    `model_id` INT NOT NULL
);
INSERT INTO laptops (name, category_id, photo_id, brand_id, model_id) VALUES
('MacBook Pro 14', 1, '1', 1, 1),
('Dell XPS 13', 2, '2', 2, 2),
('HP Spectre x360', 3, '3', 3, 3),
('Lenovo ThinkPad X1', 4, '4', 4, 4),
('Asus ROG Zephyrus', 5, '5', 5, 5);


CREATE TABLE `brands`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(50) NOT NULL
);
INSERT INTO brands (name) VALUES
('Apple'),
('Dell'),
('HP'),
('Lenovo'),
('Asus');

CREATE TABLE `categories`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `type` VARCHAR(50) NOT NULL
);
INSERT INTO categories (type) VALUES
('Ultrabook'),
('Gaming'),
('Business'),
('2-in-1'),
('Budget');

CREATE TABLE `customers`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `first_name` VARCHAR(50) NOT NULL,
    `last_name` VARCHAR(50) NOT NULL,
    `phone_number` VARCHAR(15) NOT NULL,
    `adress` VARCHAR(50) NOT NULL,
    `password_seriya` VARCHAR(50) NOT NULL
);
INSERT INTO customers (first_name, last_name, phone_number, adress, password_seriya) VALUES
('John', 'Doe', '1234567890', '1', 'AA123456'),
('Jane', 'Smith', '0987654321', '2', 'BB654321'),
('Alice', 'Johnson', '1112223333', '3', 'CC789456'),
('Bob', 'Brown', '4445556666', '4', 'DD321654'),
('Eve', 'White', '7778889999', '5', 'EE987321');

drop TABLE contracts;
CREATE TABLE `contracts`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `laptop_id` INT NOT NULL,
    `customer_id` INT NOT NULL,
    `full_price` DECIMAL(15,2) NOT NULL,
    `start_date` DATE NOT NULL,
    `end_date` DATE NOT NULL,
    `amount_month` INT NOT NULL,
    `start_price` INT NOT NULL
);
INSERT INTO contracts (laptop_id, customer_id, full_price, start_date, end_date, amount_month, start_price) VALUES
(1, 1, 2000.00, '2024-01-01', '2025-01-01', 12, 500),
(2, 2, 1500.00, '2024-02-01', '2025-02-01', 10, 300),
(3, 3, 1700.00, '2024-03-01', '2025-03-01', 8, 400),
(4, 4, 2200.00, '2024-04-01', '2025-04-01', 12, 600),
(5, 5, 2500.00, '2024-05-01', '2025-05-01', 10, 700),
(5, 5, 2500.00, '2024-05-01', '2025-05-30', 10, 700);


CREATE TABLE `payments`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `customer_id` INT NOT NULL,
    `status` ENUM('PEDDING','FULFILLED','REJECTED') NOT NULL ,
    `contract_id` INT NOT NULL,
    `payment_method` VARCHAR(50) NOT NULL
);
INSERT INTO payments (customer_id, status, contract_id, payment_method) VALUES
(1, 'FULFILLED', 1, "dollar"),
(2, 'PEDDING', 2, "send"),
(3, 'REJECTED', 3, "dollar"),
(4, 'FULFILLED', 4, "dollar"),
(5, 'PEDDING', 5, "dollar");

CREATE TABLE `laptop_photo`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `pic` VARCHAR(100) NOT NULL
);
INSERT INTO laptop_photo (pic) VALUES
('macbook.jpg'),
('dell.jpg'),
('hp.jpg'),
('lenovo.jpg'),
('asus.jpg');

CREATE TABLE `featureComp`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `laptop_id` INT NOT NULL,
    `future_id` INT NOT NULL
);
INSERT INTO featureComp (laptop_id, future_id) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5);

CREATE TABLE `features`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(50) NOT NULL,
    `color` VARCHAR(50) NOT NULL,
    `size` VARCHAR(50) NOT NULL,
    `core` VARCHAR(30) NOT NULL
);
INSERT INTO features (name, color, size, core) VALUES
('Retina Display', 'Silver', '14"', 'i7'),
('Touch Display', 'Black', '13"', 'i5'),
('Backlit Keyboard', 'Blue', '15"', 'i7'),
('Fingerprint Sensor', 'Gray', '14"', 'i9'),
('RGB Keyboard', 'White', '17"', 'i9');

CREATE TABLE `adress`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `location` VARCHAR(100) NOT NULL,
    `name` VARCHAR(50) NOT NULL
);
INSERT INTO adress (location, name) VALUES
('New York', 'Home'),
('Los Angeles', 'Office'),
('Chicago', 'Warehouse'),
('Houston', 'Store'),
('Phoenix', 'Main Branch');
CREATE TABLE `model`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(100) NOT NULL,
    `brandId` INT NOT NULL
);
INSERT INTO model (name, brandId) VALUES
('Pro 14', 1),
('XPS 13', 2),
('Spectre x360', 3),
('ThinkPad X1', 4),
('Zephyrus G14', 5);

SELECT * FROM adress;
SELECT * FROM brands;
SELECT * FROM model;
SELECT * FROM categories;
SELECT * FROM contracts;
SELECT * FROM customers;
SELECT * FROM featurecomp;
SELECT * FROM features;
SELECT * FROM laptop_photo;
SELECT * FROM laptops;
SELECT * FROM payments;

---------------------------------------------------------------------------------------------------------------------------------------------------
--1
SELECT m.id, m.name, b.name as "brand" FROM model m 
LEFT JOIN brands b ON m.id = b.id;
--2
SELECT c.id, l.name, cus.first_name, c.full_price, c.start_price,
c.start_date, c.end_date, c.amount_month
FROM contracts c
LEFT JOIN laptops l ON c.id = l.id
LEFT JOIN customers cus  ON c.id = cus.id;
;
--3
SELECT c.id,c.first_name,c.last_name,c.phone_number, a.location,c.password_seriya FROM customers c 
LEFT JOIN adress a ON c.id = a.id;

--4
SELECT f.id, l.name, lf.name as "laptopType",lf.color,lf.size,lf.core
FROM featurecomp f
LEFT JOIN features lf ON f.id = lf.id
LEFT JOIN laptops l ON f.id = l.id;
--5
SELECT l.id,l.name as "laptop",c.`type` as "category",
lp.pic,b.name as "brand",m.name as "model" 
FROM laptops l
LEFT JOIN categories c ON l.id = c.id
LEFT JOIN laptop_photo lp ON l.id = lp.id
LEFT JOIN brands b ON l.id = b.id
LEFT JOIN model m ON l.id = m.id;
;
--6
SELECT p.id, c.first_name, p.status,
con.amount_month, con.full_price, con.start_date, con.end_date, con.start_price, p.payment_method
FROM payments p
LEFT JOIN customers c ON p.id = c.id
LEFT JOIN contracts con ON p.id = con.id;

--------------------------------------- aqlli sorovlar --------------------------------------------------------------

-- SELECT p.id, c.first_name, p.status,
-- con.amount_month, con.full_price, con.start_date, con.end_date, con.start_price, p.payment_method
-- FROM payments p
-- LEFT JOIN customers c ON p.id = c.id
-- LEFT JOIN contracts con ON p.id = con.id WHERE p.status="FULFILLED" 
-- AND con.start_date BETWEEN '2025-01-01' AND '2025-03-01';

SELECT * from payments;
SELECT 
p.id, c.first_name, p.status,con.amount_month,con.full_price,con.start_date,con.end_date,con.start_price, 
p.payment_method
FROM payments p
LEFT JOIN customers c ON p.id = c.id
LEFT JOIN contracts con ON p.id = con.id
WHERE p.status = 'FULFILLED'
  AND con.end_date BETWEEN '2025-01-01' AND '2025-03-01';

---------------------------------------------------------------------


SELECT p.id, c.first_name, p.status,
con.amount_month, con.full_price, con.start_date, con.end_date, con.start_price, p.payment_method
FROM payments p
LEFT JOIN customers c ON p.id = c.id
LEFT JOIN contracts con ON p.id = con.id
where con.end_date < CURRENT_TIMESTAMP and p.status="PEDDING";

----------------------------------------------------------------------------------------------------------------------------------------------------

-- ALTER TABLE
--     `laptops` ADD CONSTRAINT `laptops_brand_id_foreign` FOREIGN KEY(`brand_id`) REFERENCES `brands`(`id`);
-- ALTER TABLE
--     `customers` ADD CONSTRAINT `customers_adress_foreign` FOREIGN KEY(`adress`) REFERENCES `adress`(`id`);
-- ALTER TABLE
--     `laptops` ADD CONSTRAINT `laptops_photo_id_foreign` FOREIGN KEY(`photo_id`) REFERENCES `laptop_photo`(`pic`);
-- ALTER TABLE
--     `featureComp` ADD CONSTRAINT `featurecomp_future_id_foreign` FOREIGN KEY(`future_id`) REFERENCES `features`(`id`);
-- ALTER TABLE
--     `laptops` ADD CONSTRAINT `laptops_category_id_foreign` FOREIGN KEY(`category_id`) REFERENCES `categories`(`id`);
-- ALTER TABLE
--     `payments` ADD CONSTRAINT `payments_contract_id_foreign` FOREIGN KEY(`contract_id`) REFERENCES `contracts`(`id`);
-- ALTER TABLE
--     `contracts` ADD CONSTRAINT `contracts_laptop_id_foreign` FOREIGN KEY(`laptop_id`) REFERENCES `laptops`(`id`);
-- ALTER TABLE
--     `model` ADD CONSTRAINT `model_brandid_foreign` FOREIGN KEY(`brandId`) REFERENCES `brands`(`id`);
-- ALTER TABLE
--     `featureComp` ADD CONSTRAINT `featurecomp_laptop_id_foreign` FOREIGN KEY(`laptop_id`) REFERENCES `laptops`(`id`);
-- ALTER TABLE
--     `laptops` ADD CONSTRAINT `laptops_model_id_foreign` FOREIGN KEY(`model_id`) REFERENCES `model`(`id`);
-- ALTER TABLE
--     `payments` ADD CONSTRAINT `payments_customer_id_foreign` FOREIGN KEY(`customer_id`) REFERENCES `customers`(`id`);
-- ALTER TABLE
--     `contracts` ADD CONSTRAINT `contracts_customer_id_foreign` FOREIGN KEY(`customer_id`) REFERENCES `customers`(`id`);
