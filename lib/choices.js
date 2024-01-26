const db = require('../db/connections.js')

const startChoices = [
    { name: "View all departments", value: 'viewAllDepartments' },
    { name: "View all roles", value: 'viewAllRoles' },
    { name: "View all employees", value: 'viewAllEmployees' },
    { name: "View budget", value: 'viewBudget' },
    { name: "View employees by manager", value: 'viewEmployeesByManager' },
    { name: "View employees by department", value: 'viewEmployeesByDepartment' },
    { name: "Add a department", value: 'addADepartment' },
    { name: "Add a role", value: 'addARole' },
    { name: "Add an employee", value: 'addAnEmployee' },
    { name: "Update an employee role", value: 'updateAnEmployeeRole' },
    { name: "Update employee manager", value: 'updateEmployeeManager' },
    { name: "Delete department", value: 'deleteDepartment' },
    { name: "Delete role", value: 'deleteRole' },
    { name: "Delete employee", value: 'deleteEmployee' },
    { name: "Exit", value:'exit'}
  ];

class CreateChoices{

    static async departments() {
        const [departmentList] = await db.query(`SELECT name, id FROM departments;`)
        const choices = [];
        departmentList.map(item => (
            choices.push({name:item.name, value:item.id})
        ));
        return choices
    }

    static async roles() {
        const [rolesList] = await db.query(`SELECT title, id FROM roles;`)
        const choices = [];
        rolesList.map(item => (
            choices.push({name:item.title, value:item.id})
        ));

        return choices
    }

    static async managers() {
        const [managersList] = await db.query(`
            SELECT DISTINCT
                CONCAT(m.first_name, ' ', m.last_name) AS mName,
                m.id AS mID
            FROM employees e 
            INNER JOIN employees m ON e.manager_id = m.id
        ;`)
        const choices = [];
        managersList.map(item => (
            choices.push({name:item.mName, value:item.mID})
        ));

        return choices
    }

    static async employees() {
        const [employeesList] = await db.query(`SELECT CONCAT(e.first_name, ' ', e.last_name) AS name, id FROM employees AS e;`)
        const choices = [];
        employeesList.map(item => (
            choices.push({name:item.name, value:item.id})
        ));
        console.log(choices);

        return choices
    }

    static async notManagers() {
        const [notManagersList] = await db.query(`
        SELECT 
            e.id AS EmployeeID,
            CONCAT(e.first_name, ' ', e.last_name) AS EmployeeName
        FROM employees e
        WHERE e.id NOT IN (
            SELECT DISTINCT manager_id 
            FROM employees 
            WHERE manager_id IS NOT NULL
    );
    `)

    const choices = [];
    notManagersList.map(item => (
        choices.push({name:item.name, value:item.id})
    ));

    return choices
    }
}

module.exports = {
    CreateChoices,
    startChoices
};

