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
    addEmployee(){
        return this.getEmployees().then(([employee]) => {
            const employeeChoices = employee.map((employee) => {
                return{
                    value:employee.id,
                    name:employee.first_name
                }
            })
            return employeeChoices
        }).then((employeeChoices) => {
            const employees = employeeChoices

            return this.roleArr().then(([roles]) => {
                //
                const roleChoices = roles.map((role) => {
                    return {
                        value: role.id,
                        name: role.title,
                    }
                })
                console.log(employees)
                return inquirer.prompt([
                    
                    {
                    type: 'input',
                    message: 'Please enter employees first name: ',
                    name: 'firstName'
                    },
                    {
                        type: 'input',
                        message: 'Please enter employees last name: ',
                        name: 'lastName'
                    },
                    {
                        type: 'list',
                        choices: roleChoices,
                        message: 'Please enter role: ',
                        name: 'role'
                    },
                    {
                        type: 'list',
                        choices: employees,
                        message: 'Please choose manager: ',
                        name: 'manager'
                    },
                    
    
                ]).then(ans=>{
                    console.log(ans)
                    const name = ans.name
                    console.log(name)
                    return this.connection.promise().query('INSERT INTO employee (first_name, last_name,role_id, manager_id) VALUES (?,?,?,?)', [ans.firstName, ans.lastName, ans.role, ans.manager] ,(err, results) => {
                       console.log('success!')
                    })
        
                }).catch(err => {
                    console.log(err)
                })
            })
        })

    }

}


module.exports = Employee