const db = require('../db/connections.js')
const { CreateChoices } = require('./choices.js')
// console.log(CreateChoices.managers())
const prompts = {
    addDeptQuestion:{
            name:"department",
            message:"Enter dept name", // need to make sure it doesnt already exis,
                validate: async (input) => {
                    try {
                        const [deptExists] = await db.query(`SELECT name 
                        FROM departments 
                        WHERE name = ?;`, [input])

                        return deptExists.length === 0 ? true :'Department Name Already Exists';
                    } catch (err){
                        console.log(err);
                    }
                }
    },
    addRoleQuestions:[
        {
        name:"title",
        message:"Enter title", // need to make sure it doesnt already exis,
            validate: async (input) => {
                try {
                    const [roleExists] = await db.query(`SELECT title 
                    FROM roles 
                    WHERE title = ?;`, [input])

                    return roleExists.length === 0 ? true :'Role Already Exists';
                } catch (err){
                    console.log(err);
                }
            }
        },
        {
            type: 'number',
            name:'salary',
            message:'Enter Salary',
            validate: input => {
                if(!isNaN(input) && input > 0){
                    return true;
                }
                return 'Enter a valid Salary'
            }
        },
        {
            "type":"list",
            "name":"department",
            "message":"Choose Department",
            "choices": async () => {
                return await CreateChoices.departments()
            }
        }
    ]
    ,
    addEmployeeQuestions:[
        {
            name:'first_name',
            message:'Enter First Name'
        },
        {
            name:'last_name',
            message:'Enter Last Name'
        },
        {
            type:'list',
            name:'role_id',
            message:'Select Role',
            choices: async () => {
                return await CreateChoices.roles()
            }
        },
        {
            type:'list',
            name:'manager_id',
            message:'Assign Manager',
            choices: async () => {
                return await CreateChoices.managers()
            }
        }
    ],
    updateEmployeeRoleQuestions:[
        {
            type:"list",
            name:'employeeID',
            message:'Choose Employee',
            choices: async () => {
                return await CreateChoices.employees()
            }
        },
        {
            type:'list',
            name:'roleID',
            message:'Choose new role for employee',
            choices: async () => {
                return await CreateChoices.roles()
            }
        }
    ],
    updateEmployeeManagerQuestions:[
        {
            type:"list",
            name:'employeeID',
            message:'Choose Employee',
            choices: async () => {
                return await CreateChoices.employees()
            }
        },
        {
            type:'list',
            name:'manager_id',
            message:'Choose new manager for employee',
            choices: async () => {
                return await CreateChoices.managers()
            }
        }
    ]
}

module.exports = prompts;

// inquirer.prompt(questions);