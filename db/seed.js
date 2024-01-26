const db = require('./connections')

const departments = [
    ['Engineering'],
    ['Sales']
];
const roles = [
    ['Senior Engineer', 100000, 1],
    ['Level II Engineer', 80000, 1],
    ['The New Guy', 500, 1],
    ['Senior Salesman', 110000, 2],
    ['Salesman', 50000, 2]
];

const employees = [
    ['Dan', 'Smith', 1, null],
    ['CJ', 'Appleseed', 2, 1],
    ['Eric', 'Smitten', 2, 1],
    ['Scott', 'Austin', 4, null],
    ['Lamen', 'Kerosene', 5, 4],
    ['Damen', 'Kerosene', 3, 4]
];

async function seed() {
    try {
        await db.query('INSERT INTO departments (name) VALUES ?', [departments])

        await db.query('INSERT INTO roles (title, salary, department_id) VALUES ?', [roles]);
        
        await db.query(`INSERT INTO employees (
            first_name, 
            last_name, 
            role_id,
            manager_id) VALUES ?`,
            [employees]
            )
            console.log('Users Seeded');
        
    } catch(err) {
        console.log(err);
    }
    try {
        const [rows] = await db.query(`SELECT
        employees.first_name, 
        employees.last_name, 
        roles.title, 
        departments.name AS department_name
        FROM employees 
        JOIN roles ON employees.role_id = roles.id
        JOIN departments ON roles.department_id = departments.id;`);
        console.table(rows);

        process.exit();
    } catch (err) {
        console.log(err);
    }
}

seed();