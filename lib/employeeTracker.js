const db = require('../db/connections.js')
const inquirer = require("inquirer");
const prompts = require("./prompts.js");

class EmployeeTracker {
    // Method to view all departments
    static async viewAllDepartments() {
        try {
            const [results] = await db.query(`SELECT id ID, name Department FROM departments;`)
            console.table(results);
        } catch (err) {
            console.log(err);
        }

    }

    // Method to view all roles
    static async viewAllRoles() {
        try {
            const [results] = await db.query(`
            SELECT
                r.id, 
                r.title, 
                r.salary,
                d.name AS department
            FROM roles r
            JOIN departments d ON r.department_id = d.id;
         `);
            console.table(results);
        } catch (err) {
            console.log(err);
        }

    }

    // Method to view all employees
    static async viewAllEmployees() {
        try {
            const [results] = await db.query(`
        SELECT
            e.id AS EmployeeID,
            e.first_name AS FirstName,
            e.last_name AS LastName,
            r.title AS Title,
            d.name AS Department,
            r.salary AS Salary,
            CONCAT(m.first_name, ' ', m.last_name) AS ManagerName
        FROM employees e
        JOIN roles r ON e.role_id = r.id
        JOIN departments d ON r.department_id = d.id
        LEFT JOIN employees m ON e.manager_id = m.id;
            `);

            console.table(results)
        } catch (err) {
            console.log(err);
        }

    }

    // Method to view employees by manager
    static async viewEmployeesByManager() {
        try {
            const [results] = await db.query(`
            SELECT 
                CONCAT(m.first_name, ' ', m.last_name) AS ManagerName,
                e.id AS EmployeeID,
                e.first_name AS FirstName,
                e.last_name AS LastName,
                r.title AS Title, 
                d.name AS Department
            FROM employees e
            JOIN roles r ON e.role_id = r.id
            JOIN departments d ON r.department_id = d.id
            JOIN employees m ON e.manager_id = m.id
            ORDER BY ManagerName, EmployeeID;
        `);

            console.table(results);
        } catch (err) {
            console.log(err);
        }

    }

    // Method to view employees by department
    static async viewEmployeesByDepartment() {
        try {
            const [results] = await db.query(`
                SELECT 
                    d.name AS DepartmentName,
                    e.id AS EmployeeID,
                    e.first_name AS FirstName,
                    e.last_name AS LastName
                FROM employees e
                JOIN roles r ON e.role_id = r.id
                JOIN departments d On r.department_id = d.id
                ORDER BY d.name;
            `);
            console.table(results);
        } catch (err) {
            console.log(err);
        }

    }

    // Method to view budget
    static async viewBudget() {
        try {
            const [results] = await db.query(`
            SELECT 
                d.name AS DepartmentName,
                SUM(r.salary) AS TotalBudget
            FROM employees e
            JOIN roles r ON e.role_id = r.id
            JOIN departments d On r.department_id = d.id
            GROUP BY d.name 
            ORDER BY d.name;
        `);

            console.table(results);
        } catch (err) {
            console.log(err);
        }

    }

    // Method to add a department
    static async addADepartment() {
        try {
            const { department } = await inquirer.prompt(prompts.addDeptQuestion);
            await db.query('INSERT INTO departments (name) VALUES (?)', [department]);
            console.log('Department Added Successfully');

        } catch (err) {
            console.log(err);
        }
    }

    // Method to add a role
    static async addARole() {
        try {
            const [departmentList] = await db.query(`SELECT name, id FROM departments;`)
            const choices = [];
            departmentList.map(item => (
                choices.push({ name: item.name, value: item.id })
            ));

            const { department, salary, title } = await inquirer.prompt(prompts.addRoleQuestions);

            await db.query('INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)', [title, salary, department])
            console.log('Role Added Successfully');

        } catch (err) {
            console.log(err);
        }
    }

    // Method to add an employee
    static async addAnEmployee() {
        try {
            const { first_name, last_name, role_id, manager_id } = await inquirer.prompt(prompts.addEmployeeQuestions);

            await db.query('INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [first_name, last_name, role_id, manager_id])
            console.log('Role Added Successfully');

        } catch (err) {
            console.log(err);
        }
    }

    // Method to update an employee role
    static async updateAnEmployeeRole() {
        try {
            const { employeeID, roleID } = await inquirer.prompt(prompts.updateEmployeeRoleQuestions)

            await db.query('UPDATE employees SET role_id = ? WHERE id = ?;', [roleID, employeeID]);

            console.log('Employee Updated');

        } catch (err) {
            console.log(err);
        }
    }

    // Method to update employee manager
    static async updateEmployeeManager() {
        try {
            const { employeeID, manager_id } = await inquirer.prompt(prompts.updateEmployeeManagerQuestions)

            await db.query('UPDATE employees SET manager_id = ? WHERE id = ?;', [manager_id, employeeID]);

            console.log('Employee Updated');

        } catch (err) {
            console.log(err);
        }
    }

    // Method to delete department
    static async deleteDepartment() {
        try {
            const { department } = await inquirer.prompt(prompts.deleteDeptQuestion)
            await db.query('DELETE FROM departments WHERE id = ?;', [department])
            console.log('Department Deleted.');
        } catch (err) {
            console.log(err);
        }
    }

    // Method to delete role
    static async deleteRole() {
        try {
            const { role_id } = await inquirer.prompt(prompts.deleteRoleQuestion)
            await db.query('DELETE FROM roles WHERE id = ?;', [role_id])
            console.log('Role Deleted.');
        } catch (err) {
            console.log(err);
        }
    }

    // Method to delete employee
    static async deleteEmployee() {
        try {
            const { employee } = await inquirer.prompt(prompts.deleteEmployeeQuestion)
            await db.query('DELETE FROM employees WHERE id = ?;', [employee])
            console.log('Employee Deleted.');
        } catch (err) {
            console.log(err);
        }
    }

    //method to start
    static start() {
        inquirer.prompt(prompts.startQuestion)
        .then(result => this[result.trackerOption]())
        .then(() => this.start())
        .catch(error => console.log(error));
    }

    // method to exit
    static exit() {
        console.log('Bye');
        process.exit();
    }
}

module.exports = EmployeeTracker;
