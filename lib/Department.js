//importing necessary npm packages
const mysql = require("mysql2");
const inquirer = require("inquirer");
const cTable = require("console.table");
//establishing db connection to make queries
const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'password',
      database: 'company_db'
    },
    console.log(`Connected to the movies_db database.`)
    
  );
//creating class Department to hold all functions that have to do with the department
class Department {

    //function to to retrieve all departments from DB
    getDepartments(){
        db.query('SELECT * FROM department',(err, results) => {
            console.table(results)
        })
    }

    addDepartment(){
        
    }

    
}

module.exports = Department