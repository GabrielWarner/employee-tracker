//installing npm packages
const inquirer = require("inquirer");
const mysql = require("mysql2");
const cTable = require("console.table");

//importing classes
const Department = require('./lib/Department')
const Role = require('./lib/Role')
const Employee = require('./lib/Employee')


//creating connection to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'password',
      database: 'company_db'
    },
    console.log(`Connected to the movies_db database.`)
    
  );


db.connect((err) => {
    if(err){
        throw err
    }

})
//creating objects that hold querys
const department = new Department(db)
const role = new Role(db)
const employee = new Employee(db)

//function to run CLI
const start = () => {
  inquirer
    .prompt([
      {
        type: "list",
        choices: [
          "View All Employees",
          "Add Employee",
          "Update Employee Role",
          "View All Roles",
          "Add Role",
          "View All Departments",
          "Add Department",
          "Quit",
        ],
        message: "Please an option: ",
        name: "userChoice",
      },
    ])
    .then((ans) => {
      switch (ans.userChoice) {
        
        case "View All Employees":
          employee.getEmployees().then(([data]) => {
            console.table(data)
            start()
          });
          break;

        case "Add Employee":
          employee.addEmployee().then(([data]) => {
            start()
          })
          break;

        case "Update Employee Role":
          employee.updateEmployee().then(([data]) => {
            start()
          })
          break;

        case "View All Roles":
          role.getRoles().then(([data]) => {
            console.table(data)
            start()
          });
          break;

        case "Add Role":
          role.addRole().then(([data])=>{
            start()
        })
          break;

        case "View All Departments":
          department.getDepartments().then(([data]) => {
            console.table(data)
            start()
          });
          break;
        case "Add Department":
          department.addDepartment().then(([rows, fields]) => {
            console.log(rows)
            console.log(fields)
            start()
        });
          
          break;

        case "Quit":
          quit();
          break;

        default:
          console.log("thanks for playing!");
          break;
      }
    })
};


start();
