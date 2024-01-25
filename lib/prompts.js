const options = [
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
    { name: "Delete employee", value: 'deleteEmployee' }
  ];
  

/*
BONUS 

Update employee managers.

View employees by manager.

View employees by department.

Delete departments, roles, and employees.

View the total utilized budget of a department—in other words, the combined salaries of all employees in that department.
*/

const questions = [
  {
    type: "list",
    name: "trackerOption",
    message: "What Would you like to do?",
    choices: options,
  },
];

module.exports = questions;

// inquirer.prompt(questions);