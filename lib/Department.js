//importing necessary npm packages
const mysql = require("mysql2");
const inquirer = require("inquirer");
const cTable = require("console.table");
const { start } = require("repl");

//establishing db connection to make queries
// const db = mysql.createConnection(
//     {
//       host: 'localhost',
//       user: 'root',
//       password: 'password',
//       database: 'company_db'
//     },
//     console.log(`Connected to the movies_db database.`)
    
//   );
//creating class Department to hold all functions that have to do with the department
class Department {

    constructor(connection) {
        this.connection = connection;
      }
    

    //function to to retrieve all departments from DB
    getDepartments(){
        return this.connection.promise().query('SELECT * FROM department')
    }

    addDepartment(){
        return inquirer.prompt([
            {
            type: 'input',
            message: 'Please enter Department name: ',
            name: 'name'
            },
        ]).then(ans=>{
            console.log("HIIII")
            const name = ans.name
            console.log(name)
            return this.connection.promise().query('INSERT INTO department (name) VALUES (?)', name ,(err, results) => {
               console.log('success!')
            })

        }).catch(err => {
            console.log(err)
        })
    }
}

//'INSERT INTO department (name) VALUES (?)', name 
module.exports = Department