 -- Customer ---------------------
CREATE TABLE IF NOT EXISTS customer (
customer_id INT PRIMARY KEY NOT NULL,
customer_name VARCHAR(80) NOT NULL,
email_address VARCHAR(120) NOT NULL,
phone_number VARCHAR (20) NOT NULL,
newsletter_signup BOOLEAN DEFAULT FALSE
);
--ALTER TABLE customer
--ADD PRIMARY KEY (customer_id);
select * from customer;

--- MENU------------------------
CREATE TABLE IF NOT EXISTS menu_order (
food_id INT PRIMARY KEY,
food_name VARCHAR(80) NOT NULL,
price DECIMAL(5,2) NOT NULL,
description VARCHAR(120) NOT NULL
);
--ALTER TABLE menu
--ADD CONSTRAINT "foreign key for customer ids"
--FOREIGN KEY (customer_id)
--REFERENCES customer (customer_id);
SELECT * FROM menu;

--- TABLE RESERVATION --------------------------
CREATE TABLE IF NOT EXISTS table_reservation (
reservation_id INT PRIMARY KEY,
table_id INT NOT NULL REFERENCES rest_tables (table_id) ON DELETE CASCADE,
reservation_date DATE NOT NULL,
time_slot TIMESTAMP NOT NULL, -- TSRANGE time range type native range type that makes handling easy'[18:00- 20:00]'
guest_count INT NOT NULL,
status VARCHAR(20) DEFAULT 'confirmed'  -- Multiple status options
        CHECK (status IN ('confirmed', 'cancelled', 'completed', 'no_show')),
customer_id INT NOT NULL REFERENCES customer(customer_id) ON DELETE CASCADE,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT  CURRENT_TIMESTAMP,
UNIQUE (table_id, time_slot) --prevent double booking
);
SELECT * FROM table_reservation;

--- TABLE FOR TABLES :-)---------
CREATE TABLE IF NOT EXISTS rest_tables(
table_id INT PRIMARY KEY,
table_number INT UNIQUE NOT NULL,
seating_capacity INT DEFAULT 4,
location VARCHAR(50),
is_active BOOLEAN DEFAULT TRUE,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
)