//installing npm packages
const inquirer = require("inquirer");
const mysql = require("mysql2");
const cTable = require("console.table");

//importing classes
const Department = require('./lib/Department')


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

const department = new Department()

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
          viewEmployees();
          break;

        case "Add Employee":
          addEmployee();
          break;

        case "Update Employee Role":
          updateEmployee();
          break;

        case "View All Roles":
          viewRoles();
          break;
        case "Add Role":
          addRole();
          break;
        case "View All Departments":
          department.getDepartments();
          start();
          break;
        case "Add Department":
          department.addDepartment();
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

const viewEmployees = () => {
  console.log("hi");
};

start();
