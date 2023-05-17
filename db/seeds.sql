INSERT INTO departments(department_name)
VALUES
('Board of Directors'),
('Accounting/Finances'),
('HR'),
('Marketing'),
('Business Developement'),
('UX/UI'),
('IT');

INSERT INTO roles(title, salary, department_id)
VALUES
('CEO', '1500000.00', 1),
('Head of Marketing', '645000.00', 2),
('HR Director', '400000.00', 3),
('Finance Head', '250000.00', 4),
('Project Lead', '170000.00', 5),
('Customer Relations Manager', '80000.00', 6),
('Junior Dev', '130000.00', 7);


INSERT INTO employees(first_name, last_name, role_id)
VALUES
('Jonathan', 'Olsen', 1),
('James', 'Duncan', 2),
('Brent', 'White', 3),
('Kim', 'Westling', 4),
('Declan', 'Paramount', 5),
('Haley', 'Fenner', 6),
('Jessica', 'Fieger', 7),
('Hannah', 'Gotchky', 7),
('Jeremy', 'Oldenburg', 7),
('Gigga', 'Chad', 7),
('Kale', 'Johnson', 7),
('Travis', 'Renner', 7);
