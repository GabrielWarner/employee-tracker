const inquirer = require("inquirer");
const Department = require("./Department");

class Employee extends Department {
    
    super(connection) {
        this.connection = connection;
    }
    //shows list of all roles
    getEmployees(){ 
        return this.connection.promise().query('SELECT * FROM employee')
    }


}


module.exports = Employee