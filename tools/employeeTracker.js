const db = require('../db/connections.js')
const inquirer = require("inquirer");
const prompts = require("../lib/prompts.js");


class Tracker {
    // Method to view all departments
    static async viewAllDepartments() {
        const [results] = await db.query(`SELECT id ID, name Department FROM departments;`)
        console.table(results);
    }

    // Method to view all roles
    static async viewAllRoles() {
        const [results] = await db.query(`SELECT id, title, salary FROM roles`);

        console.table(results);
    }

    // Method to view all employees
    static async viewAllEmployees() {
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
    }

    // Method to view employees by manager
    static async viewEmployeesByManager() {
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
    }

    // Method to view employees by department
    static async viewEmployeesByDepartment() {
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
    }

    // Method to view budget
    static async viewBudget() {
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
    }

    // Method to add a department
    static async addADepartment() {
        try {
            const { department } = await inquirer.prompt(prompts.addDeptQuestion)
            await db.query('INSERT INTO departments (name) VALUES (?)', [department])
            await this.viewAllDepartments();
            console.log('Department Added Successfully');    

        } catch(err) {
            console.log(err);
        }
    }

    // Method to add a role
    static async addARole() {
        try {
            // const departmentList = await this.listDepts();
            const [departmentList] = await db.query(`SELECT name, id FROM departments;`)
            const choices = [];
            departmentList.map(item => (
                choices.push({name:item.name, value:item.id})
            ));
        
            const { title, salary, department } = await inquirer.prompt(prompts.addRoleQuestions);
            
            await db.query('INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)', [title, salary, department])
            await this.viewAllRoles();
            console.log('Role Added Successfully');    

        } catch(err) {
            console.log(err);
        }
    }

    // Method to add an employee
    static async addAnEmployee() {
        try {
            const {first_name, last_name, role_id, manager_id} = await inquirer.prompt(prompts.addEmployeeQuestions);
            
            await db.query('INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [first_name, last_name, role_id, manager_id])
            await this.viewAllRoles();
            console.log('Role Added Successfully');    

        } catch(err) {
            console.log(err);
        }
    }

    // Method to update an employee role
    static async updateAnEmployeeRole() {
        try {
            const { employeeID, roleID } = await inquirer.prompt(prompts.updateEmployeerRoleQuestions)
            console.log( employeeID, roleID)
            await db.query('UPDATE employees SET role_id = ? WHERE id = ?;', [roleID, employeeID]);

            console.log('Employee Updated');

        } catch(err) {  
            console.log(err);
        }
        // const [results] = await db.query(``);
    }

    // Method to update employee manager
    static async updateEmployeeManager() {
        try {
            const { employeeID, manager_id } = await inquirer.prompt(prompts.updateEmployeeManagerQuestions)
            console.log( employeeID, manager_id)
            await db.query('UPDATE employees SET manager_id = ? WHERE id = ?;', [manager_id, employeeID]);

            console.log('Employee Updated');

        } catch(err) {  
            console.log(err);
        }
    }

    // Method to delete department
    static async deleteDepartment() {
        try {
            const { department } = await inquirer.prompt(prompts.deleteDeptQuestion)
            await db.query('DELETE FROM departments WHERE id = ?;', [department])
            await this.viewAllDepartments();
            console.log('Department Deleted.');    
        } catch(err) {
            console.log(err);
        }
    }

    // Method to delete role
    static async deleteRole() {
        try {
            const { role } = await inquirer.prompt(prompts.deleteRoleQuestion)
            await db.query('DELETE FROM roles WHERE id = ?;', [role])
            console.log('Role Deleted.');    
        } catch(err) {
            console.log(err);
        }
    }

    // Method to delete employee
    static async deleteEmployee() {

    try{
        const { employee } = await inquirer.prompt(prompts.deleteEmployeeQuestion)
        await db.query('DELETE FROM employees WHERE id = ?;', [employee])
        console.log('Employee Deleted.');    
    } catch(err) {
        console.log(err);
    }
    }

    // method to exit
    static exit() {
        process.exit();
    }
}

module.exports = Tracker;
