//Gabriel Warner - Employee Tracker - 7/28/22
//installing npm packages
const inquirer = require("inquirer");
const mysql = require("mysql2");
const figlet = require('figlet')
//importing classes
const Department = require("./lib/Department");
const Role = require("./lib/Role");
const Employee = require("./lib/Employee");
//creating connection to database
const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "password",
    database: "company_db",
  },
  console.log(`Connected to the movies_db database.`)
);
db.connect((err) => {
  if (err) {
    throw err;
  }
});
//creating objects that hold querys
const department = new Department(db);
const role = new Role(db);
const employee = new Employee(db);

figlet("EMPLOYEE TRACKER", function(err, data) {
  if(err) {
    console.log('something went wrong')
    console.dir(err)
    return
  }
  console.log(data)
}) 

//function to run CLI
const start = () => {
  inquirer
    .prompt([
      {
        //listing out all options
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
      //switch statement to collect user choice and then run function based off selection
      switch (ans.userChoice) {
        case "View All Employees":
          //uses employee Class method to get employees and then use console table to display results
          employee.getEmployees().then(([data]) => {
            //displaying results
            console.table(data);
            //calling start function to ask the user questions again
            start();
          });
          break;
        case "Add Employee":
          employee.addEmployee().then(([data]) => {
            start();
          });
          break;
        //data is not being used because everything that is outputted is in the function
        case "Update Employee Role":
          employee.updateEmployee().then(([data]) => {
            start();
          });
          break;
        //same process as above except using the Role Class
        case "View All Roles":
          role.getRoles().then(([data]) => {
            console.table(data);
            start();
          });
          break;
        //same process as above except using the Role Class
        case "Add Role":
          role.addRole().then(([data]) => {
            start();
          });
          break;
        //same process as above except using the Department Class
        case "View All Departments":
          department.getDepartments().then(([data]) => {
            console.table(data);
            start();
          });
          break;
        case "Add Department":
          department.addDepartment().then(([rows, fields]) => {
            console.log(rows);
            start();
          });
          break;
        //option that ends the process
        case "Quit":
          process.exit();
          break;
        default:
          console.log("thanks for playing!");
          break;
      }
    });
};

//calling initial start function. This function runs in a loop because everytime the user chooses an option the start function gets called again
start();
