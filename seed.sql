USE employee_tracker;

INSERT INTO departments (name) VALUES 
    ('Engineering'),
    ('Sales');


INSERT INTO roles (title, salary, department_id) VALUES 
    ('Senior Engineer', 100000, 1),
    ('Level II Engineer', 80000, 1),
    ('The New Guy', 500, 1),
    ('Senior Salesman', 110000, 2),
    ('Salesman', 50000, 2);


INSERT INTO employees (
    first_name, 
    last_name, 
    role_id,
    manager_id) VALUES
        ('Dan', 'Smith', 1, NULL),
        ('CJ', 'Appleseed', 2, 1),
        ('Eric', 'Smitten', 2, 1),
        ('Scott', 'Austin', 4, NULL),
        ('Lamen', 'Kerosene', 5, 4),
        ('Damen', 'Kerosene', 3, 4);

SELECT
    employees.first_name, 
    employees.last_name, 
    roles.title, 
    departments.name AS department_name
    FROM employees 
    JOIN roles ON employees.role_id = roles.id
    JOIN departments ON roles.department_id = departments.id;