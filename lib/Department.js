//importing necessary npm packages
const inquirer = require("inquirer");
//creating class Department to hold all functions that have to do with the department
class Department {
  //hands in connection from index folder so that I can use .promis()
  constructor(connection) {
    this.connection = connection;
  }
  //function to to retrieve all departments from DB
  getDepartments() {
    return this.connection.promise().query("SELECT name FROM department");
  }
  //function to retrieve all columns from department table
  departmentArr() {
    return this.connection.promise().query("SELECT * FROM department");
  }
  //functiuon to retrieve all columns from role table
  roleArr() {
    return this.connection.promise().query("SELECT * FROM role");
  }
  //function to add department
  addDepartment() {
    //using inquirer to ask the question
    return inquirer
      .prompt([
        {
          type: "input",
          message: "Please enter Department name: ",
          name: "name",
        },
      ])
      .then((ans) => {
        //setting name variable and then querying db to insert into department table
        //as you can see we are using a .promis() with the .query() to ensure the function does not run with inquirer
        const name = ans.name;
        return this.connection
          .promise()
          .query(
            "INSERT INTO department (name) VALUES (?)",
            name,
            (err, results) => {
              console.log("success!");
            }
          );
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
//exporting class Department
module.exports = Department;
