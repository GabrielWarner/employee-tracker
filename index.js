const inquirer = require ('inquirer')
const mysql = require('mysql2');
const cTable = require('console.table')

const start = () => {
    inquirer.prompt([
        inquirer.prompt([
            {
                type: 'list',
                choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Quit'],
                message: 'Please an option: ',
                name: 'userChoice'
            },
        ]).then(ans=>{
            switch (ans.userChoice) {
                case "View All Employees":
                    createEngineer();
                    break;
    
                case "Add Employee":
                    createIntern();
                    break;
    
                case "Update Employee Role":
                    createHtml();
                    break;

                case "View All Roles":
                    createHtml();
                    break;            
                case "Add Role":
                    createHtml();
                    break;                
                case "View All Departments":
                    createHtml();
                    break;
                case "Add Department":
                    createHtml();
                    break;                                      

                case "Quit":
                    createHtml();
                    break;                      

                default:
                    console.log("thanks for playing!")
                    break;
            }
        })
    ])
}

start()