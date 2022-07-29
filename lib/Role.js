//importing required packages
const inquirer = require("inquirer");
const Department = require("./Department");
//class Role extends Department in order to use class methods
class Role extends Department {
  super(connection) {
    this.connection = connection;
  }
  //shows list of all roles
  getRoles() {
    return this.connection.promise().query("SELECT * FROM role");
  }
  //adds role to database
  addRole() {
    //gathering all columns from department table
    return this.departmentArr().then(([departments]) => {
      //creating new array grabbing only the id and name of department
      const depChoices = departments.map((dep) => {
        return {
          value: dep.id,
          name: dep.name,
        };
      });
      //starting inquirer to ask questions
      return inquirer
        .prompt([
          {
            type: "input",
            message: "Please enter Role name: ",
            name: "name",
          },
          {
            type: "input",
            message: "Please enter Role salary: ",
            name: "salary",
          },
          //depChoices shows the name of the department but the value is the id number
          {
            type: "list",
            choices: depChoices,
            message: "Please choose department: ",
            name: "department",
          },
        ])
        .then((ans) => {
          //using the global connection for the query and also using a promise so that it doesnt run before the user is able to answer the questions
          return this.connection
            .promise()
            .query(
              "INSERT INTO role (title, department_id,salary) VALUES (?,?,?)",
              [ans.name, ans.department, ans.salary],
              (err, results) => {
                console.log("success!");
              }
            );
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }
}
//exporting Class Role
module.exports = Role;
