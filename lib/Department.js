//importing necessary npm packages
const mysql = require("mysql2");
const inquirer = require("inquirer");
const cTable = require("console.table");
const { start } = require("repl");
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
            return
        })
    }

    addDepartment(){
        inquirer.prompt([
            {
            type: 'input',
            message: 'Please enter Department name: ',
            name: 'name'
            },
        ]).then(ans=>{
            const name = ans.name
            db.promise().query('INSERT INTO department (name) VALUES (?)', name ,(err, results) => {
                console.log('success!')
            }).then(([rows, fields]) => {
                console.log(rows)
                console.log(fields)
            })
            .catch(console.log)
            .then( () => db.end())
        })
    }
}

//'INSERT INTO department (name) VALUES (?)', name 
module.exports = Department