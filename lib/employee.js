//importing necessary packages
const inquirer = require("inquirer");
const Department = require("./Department");

//creating new class and letting it extend Department so when can use its methods
class Employee extends Department {
    //constructor passing in connection from department
  super(connection) {
    this.connection = connection;
  }
  //shows list of all roles
  getEmployees() {
    return this.connection.promise().query("SELECT * FROM employee");
  }
//function to start add employee
  addEmployee() {
    //nested .then function
    //start off by running function to gather all employees
    return this.getEmployees()
      .then(([employee]) => {
        //once I have all of the employees I create a new array with just the id and name
        const employeeChoices = employee.map((employee) => {
          return {
            value: employee.id,
            name: employee.first_name,
          };
        });
        return employeeChoices;
      })
      //made sure to pass in the array I just made to the new function
      .then((employeeChoices) => {
        const employees = employeeChoices;
        //this does the exact same thing as above except it gathers the roles
        return this.roleArr().then(([roles]) => {
          const roleChoices = roles.map((role) => {
            return {
              value: role.id,
              name: role.title,
            };
          });
          //inquirer to start prompt
          return inquirer
            .prompt([
              {
                type: "input",
                message: "Please enter employees first name: ",
                name: "firstName",
              },
              {
                type: "input",
                message: "Please enter employees last name: ",
                name: "lastName",
              },
              //handing in roleChoices array, this will show the user the name of the role but the vale behind it will be the role ID
              {
                type: "list",
                choices: roleChoices,
                message: "Please enter role: ",
                name: "role",
              },
            //handing in employees array, this will show the user the name of the role but the vale behind it will be the role ID
              {
                type: "list",
                choices: employees,
                message: "Please choose manager: ",
                name: "manager",
              },
            ])
            .then((ans) => {
                //running the MySQL query in order to insert the employee
                //using a promise with the query so that it wont run before the user has selected options from inquirer
              return this.connection
                .promise()
                .query(
                  "INSERT INTO employee (first_name, last_name,role_id, manager_id) VALUES (?,?,?,?)",
                  [ans.firstName, ans.lastName, ans.role, ans.manager],
                  (err, results) => {
                    console.log("success!");
                  }
                );
            })
            .catch((err) => {
              console.log(err);
            });
        });
      });
  }
  //function to update employee
  updateEmployee() {
    //start off by running function to gather all employees
    return this.getEmployees()
      .then(([employee]) => {
        //once I have all of the employees I create a new array with just the id and name
        const employeeChoices = employee.map((employee) => {
          return {
            //making sure only to give the id and name
            value: employee.id,
            name: employee.first_name,
          };
        });
        return employeeChoices;
      })
      .then((employeeChoices) => {
        const employees = employeeChoices;
        //repeating the same steps above except with the role array
        return this.roleArr().then(([roles]) => {
            const roleChoices = roles.map((role) => {
                return {
                  value: role.id,
                  name: role.title,
                };
              });
              
            return inquirer
            .prompt([
                //passing in employees array, the employees name shows up but the id is grabbed
              {
                type: "list",
                choices: employees,
                message: "Choose an employee to update: ",
                name: "employee",
              },
              {
                //passing in roleChoices array.
                type: 'list',
                choices: roleChoices,
                message: "Choose the role you want to give: ",
                name: "role",
              },
            ])
            .then((ans) => {
                //setting variables to make it easier to write query
                const employeeChoice = ans.employee
                const roleChoice = ans.role
                console.log(employeeChoice)
                console.log(roleChoice)
                //using a promise with the query so that it wont run before the user has selected options from inquirer
                return this.connection
                  .promise()
                  .query(
                    "UPDATE employee set role_id = ? WHERE id = ?",
                    [roleChoice, employeeChoice],
                    (err, results) => {
                      console.log("success!");
                    }
                  );
              })
              .catch((err) => {
                console.log(err);
              });
        })
      });
  }
}

module.exports = Employee;
