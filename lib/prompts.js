const db = require('../db/connections.js')
const { CreateChoices } = require('./choices.js')


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
            "type":"list",
            "name":"department",
            "message":"Choose Department",
            "choices": async () => {
                return await CreateChoices.departments()
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
            name:"title",
            message:"Enter title"
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
    ],
    deleteDeptQuestion:{
        type:"list",
        name:"department",
        message:"Choose Department to Delete",
        choices: async () => {
            return await CreateChoices.departments()
        }
    },
    deleteRoleQuestion:{
        type:"list",
        name:"role_id",
        message:"Choose Role to Delete",
        choices: async () => {
            return await CreateChoices.roles()
        }
    },
    deleteEmployeeQuestion:{
        type:"list",
        name:"employee",
        message:"Choose Employee to Delete",
        choices: async () => {
            return await CreateChoices.employees()
        }
    }
}

module.exports = prompts;