//importing necessary npm packages
const inquirer = require("inquirer");
const cTable = require("console.table");

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
    //hands in connection from index folder so that I can use .promis()
    constructor(connection) {
        this.connection = connection;
      }
    

    //function to to retrieve all departments from DB
    getDepartments(){
        return this.connection.promise().query('SELECT name FROM department')
    }

    departmentArr() {
        return this.connection.promise().query('SELECT * FROM department')
    }

    roleArr() {
        return this.connection.promise().query('SELECT * FROM role')
    }

    addDepartment(){
        return inquirer.prompt([
            {
            type: 'input',
            message: 'Please enter Department name: ',
            name: 'name'
            },
        ]).then(ans=>{
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