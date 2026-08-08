// ─── Seed SQL for each schema ─────────────────────────────────────────────────

export const SEED_SQL = {
  hr: `
CREATE TABLE departments (id INTEGER PRIMARY KEY, name TEXT, manager_id INTEGER, budget REAL);
CREATE TABLE employees (id INTEGER PRIMARY KEY, name TEXT, email TEXT, department_id INTEGER, position TEXT, salary REAL, hire_date TEXT, status TEXT);
CREATE TABLE attendance (id INTEGER PRIMARY KEY, employee_id INTEGER, date TEXT, clock_in TEXT, clock_out TEXT, status TEXT);
CREATE TABLE leave_requests (id INTEGER PRIMARY KEY, employee_id INTEGER, type TEXT, start_date TEXT, end_date TEXT, status TEXT, approved_by INTEGER);

INSERT INTO departments VALUES
(1,'Engineering',1,500000),(2,'Marketing',5,300000),(3,'HR',8,200000),(4,'Finance',10,400000),(5,'Operations',12,350000);

INSERT INTO employees VALUES
(1,'Andi Pratama','andi@company.com',1,'Senior Engineer',12000000,'2020-01-15','active'),
(2,'Budi Santoso','budi@company.com',1,'Junior Engineer',7000000,'2021-03-01','active'),
(3,'Citra Dewi','citra@company.com',1,'Engineer',9000000,'2020-06-10','active'),
(4,'Dian Rahayu','dian@company.com',2,'Marketing Lead',11000000,'2019-08-20','active'),
(5,'Eka Putri','eka@company.com',2,'Marketing Staff',6500000,'2022-01-10','active'),
(6,'Fajar Nugroho','fajar@company.com',3,'HR Manager',10000000,'2018-05-15','active'),
(7,'Gita Sari','gita@company.com',3,'HR Staff',6000000,'2022-07-01','active'),
(8,'Hendra Wijaya','hendra@company.com',4,'Finance Manager',11500000,'2019-02-10','active'),
(9,'Indah Kurnia','indah@company.com',4,'Accountant',8000000,'2021-09-01','active'),
(10,'Joko Susilo','joko@company.com',5,'Ops Lead',9500000,'2020-11-15','active'),
(11,'Kartini','kartini@company.com',1,'Engineer',8500000,'2021-05-20','active'),
(12,'Lina Marlina','lina@company.com',2,'Marketing Staff',6500000,'2022-03-15','inactive'),
(13,'Mario Kart','mario@company.com',1,'Junior Engineer',7000000,'2023-01-10','active'),
(14,'Nita Sari','nita@company.com',3,'HR Staff',6000000,'2022-10-01','active'),
(15,'Oki Wibowo','oki@company.com',4,'Accountant',8000000,'2020-04-20','active');

INSERT INTO attendance VALUES
(1,1,'2024-01-15','08:00','17:05','present'),(2,1,'2024-01-16','08:15','17:00','present'),
(3,2,'2024-01-15','09:30','17:00','late'),(4,2,'2024-01-16','08:00','17:00','present'),
(5,3,'2024-01-15',NULL,NULL,'absent'),(6,3,'2024-01-16','08:05','17:10','present'),
(7,4,'2024-01-15','08:00','17:00','present'),(8,5,'2024-01-15','10:00','17:00','late'),
(9,6,'2024-01-15','08:00','17:00','present'),(10,7,'2024-01-15','08:30','17:00','present'),
(11,1,'2024-01-17','08:00','17:00','present'),(12,2,'2024-01-17','08:00',NULL,'present'),
(13,8,'2024-01-15','08:00','17:00','present'),(14,9,'2024-01-15','08:00','17:00','present'),
(15,10,'2024-01-15','08:00','17:00','present');

INSERT INTO leave_requests VALUES
(1,3,'annual','2024-01-15','2024-01-16','approved',6),(2,5,'sick','2024-01-20','2024-01-20','approved',6),
(3,7,'annual','2024-02-01','2024-02-05','pending',NULL),(4,2,'sick','2024-01-18','2024-01-18','approved',6),
(5,12,'annual','2024-01-10','2024-01-12','rejected',6),(6,13,'annual','2024-03-01','2024-03-03','pending',NULL),
(7,1,'annual','2024-04-15','2024-04-16','approved',6),(8,4,'sick','2024-01-22','2024-01-22','approved',6);
`,
  ecommerce: `
CREATE TABLE customers (id INTEGER PRIMARY KEY, name TEXT, email TEXT, phone TEXT, city TEXT, created_at TEXT);
CREATE TABLE products (id INTEGER PRIMARY KEY, name TEXT, category TEXT, price REAL, stock INTEGER, is_active INTEGER);
CREATE TABLE orders (id INTEGER PRIMARY KEY, customer_id INTEGER, total_amount REAL, status TEXT, created_at TEXT, payment_method TEXT);
CREATE TABLE order_items (id INTEGER PRIMARY KEY, order_id INTEGER, product_id INTEGER, quantity INTEGER, unit_price REAL);

INSERT INTO customers VALUES
(1,'Ahmad Fauzi','ahmad@email.com','081234567890','Jakarta','2023-01-10'),
(2,'Bunga Citra','bunga@email.com','082345678901','Bandung','2023-02-15'),
(3,'Charlie Brown','charlie@email.com','083456789012','Surabaya','2023-03-20'),
(4,'Dewi Sartika','dewi@email.com','084567890123','Yogyakarta','2023-04-05'),
(5,'Erik Susanto','erik@email.com','085678901234','Medan','2023-05-12'),
(6,'Fitri Handayani','fitri@email.com','086789012345','Jakarta','2023-06-18'),
(7,'Guntur Wibowo','guntur@email.com','087890123456','Semarang','2023-07-22'),
(8,'Ahmad Fauzi','ahmad.f2@email.com','081234567891','Jakarta','2023-08-01'),
(9,'null_user',NULL,'089012345678','Bali','2023-09-10'),
(10,'Ira Pratiwi','ira@email.com','080123456789','Jakarta','2023-10-05');

INSERT INTO products VALUES
(1,'Laptop ASUS','Electronics',8500000,15,1),(2,'iPhone 15','Electronics',15000000,8,1),
(3,'Samsung TV 55"','Electronics',7500000,5,1),(4,'Kaos Polos','Fashion',120000,100,1),
(5,'Celana Jeans','Fashion',250000,50,1),(6,'Buku Python','Books',150000,30,1),
(7,'Headphones Sony','Electronics',750000,20,1),(8,'Tas Ransel','Fashion',350000,25,1),
(9,'Keyboard Mechanical','Electronics',1200000,0,1),(10,'Produk Lama','Electronics',500000,0,0);

INSERT INTO orders VALUES
(1,1,8500000,'completed','2024-01-10','transfer'),(2,1,15000000,'completed','2024-01-15','credit_card'),
(3,2,370000,'completed','2024-01-12','transfer'),(4,3,8500000,'pending','2024-01-20','transfer'),
(5,4,750000,'completed','2024-01-08','gopay'),(6,5,1350000,'cancelled','2024-01-18','transfer'),
(7,6,250000,'completed','2024-01-22','ovo'),(8,7,15000000,'completed','2024-01-25','credit_card'),
(9,2,8500000,'completed','2024-01-28','transfer'),(10,1,1200000,'pending','2024-02-01','transfer'),
(11,8,750000,'completed','2024-02-03','gopay'),(12,9,250000,'completed','2024-02-05','transfer');

INSERT INTO order_items VALUES
(1,1,1,1,8500000),(2,2,2,1,15000000),(3,3,4,2,120000),(4,3,5,1,250000),
(5,4,1,1,8500000),(6,5,7,1,750000),(7,6,1,1,8500000),(8,6,6,2,150000),
(9,7,5,1,250000),(10,8,2,1,15000000),(11,9,1,1,8500000),(12,10,9,1,1200000),
(13,11,7,1,750000),(14,12,5,1,250000);
`,
  banking: `
CREATE TABLE customers (id INTEGER PRIMARY KEY, name TEXT, nik TEXT, email TEXT, phone TEXT, joined_at TEXT);
CREATE TABLE accounts (id INTEGER PRIMARY KEY, customer_id INTEGER, account_number TEXT, type TEXT, balance REAL, status TEXT);
CREATE TABLE transactions (id INTEGER PRIMARY KEY, account_id INTEGER, type TEXT, amount REAL, balance_after REAL, description TEXT, created_at TEXT);
CREATE TABLE loans (id INTEGER PRIMARY KEY, customer_id INTEGER, amount REAL, interest_rate REAL, status TEXT, due_date TEXT);

INSERT INTO customers VALUES
(1,'Budi Hartono','3201010101010001','budi@bank.com','081111111111','2020-01-15'),
(2,'Sari Dewi','3201010101010002','sari@bank.com','082222222222','2020-03-20'),
(3,'Anto Wijaya','3201010101010003','anto@bank.com','083333333333','2021-05-10'),
(4,'Maya Putri','3201010101010004','maya@bank.com','084444444444','2021-08-15'),
(5,'Rudi Santoso','3201010101010005','rudi@bank.com','085555555555','2022-01-20'),
(6,'Linda Sari','3201010101010001','linda@bank.com','086666666666','2022-04-10'),
(7,'Doni Prasetyo','3201010101010007','doni@bank.com','087777777777','2023-01-05'),
(8,'Eka Nugraha',NULL,'eka@bank.com','088888888888','2023-06-15');

INSERT INTO accounts VALUES
(1,1,'1000000001','savings',15000000,'active'),(2,1,'1000000002','checking',5000000,'active'),
(3,2,'1000000003','savings',25000000,'active'),(4,3,'1000000004','savings',3000000,'active'),
(5,4,'1000000005','checking',8000000,'active'),(6,5,'1000000006','savings',1000000,'active'),
(7,6,'1000000007','savings',12000000,'active'),(8,7,'1000000008','savings',500000,'active'),
(9,8,'1000000009','savings',0,'inactive'),(10,1,'1000000010','savings',7000000,'active');

INSERT INTO transactions VALUES
(1,1,'deposit',5000000,20000000,'Setoran tunai','2024-01-10 09:00:00'),
(2,1,'withdrawal',2000000,18000000,'Tarik tunai ATM','2024-01-11 14:30:00'),
(3,1,'transfer',3000000,15000000,'Transfer ke rek 1000000003','2024-01-12 10:00:00'),
(4,3,'deposit',3000000,28000000,'Terima transfer','2024-01-12 10:01:00'),
(5,2,'withdrawal',1000000,4000000,'Tarik ATM','2024-01-13 16:00:00'),
(6,4,'deposit',1000000,4000000,'Setoran tunai','2024-01-15 08:30:00'),
(7,5,'transfer',2000000,6000000,'Transfer gaji','2024-01-20 07:00:00'),
(8,6,'withdrawal',500000,500000,'Tarik ATM','2024-01-21 12:00:00'),
(9,9,'deposit',100000,100000,'Setoran pembukaan','2023-06-15 09:00:00'),
(10,9,'withdrawal',100000,0,'Penutupan rekening','2023-07-01 14:00:00'),
(11,1,'deposit',2000000,17000000,'Setoran gaji','2024-02-01 08:00:00'),
(12,3,'withdrawal',5000000,23000000,'Tarik tunai','2024-02-05 11:00:00');

INSERT INTO loans VALUES
(1,1,50000000,12.5,'active','2025-01-15'),(2,2,100000000,11.0,'active','2026-03-20'),
(3,3,25000000,13.0,'active','2024-05-10'),(4,4,75000000,12.0,'closed','2023-08-15'),
(5,5,30000000,14.0,'overdue','2023-12-20'),(6,7,20000000,13.5,'active','2025-06-05');
`
};
