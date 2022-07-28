const inquirer = require("inquirer");
const Department = require("./Department");



class Role extends Department {
    
    super(connection) {
    }
    //shows list of all roles
    getRoles(){ 
        return this.connection.promise().query('SELECT * FROM role')
    }
    //adds role to database
    addRole(){

        return this.departmentArr().then(([departments]) => {
            //
            const depChoices = departments.map((dep) => {
                return {
                    value: dep.id,
                    name: dep.name,
                }
            })
            return inquirer.prompt([
    
                {
                type: 'input',
                message: 'Please enter Role name: ',
                name: 'name'
                },
                {
                    type: 'input',
                    message: 'Please enter Role salary: ',
                    name: 'salary'
                },
                {
                    type: 'list',
                    choices: depChoices,
                    message: 'Please choose department: ',
                    name: 'department'
                },
            ]).then(ans=>{
                console.log(ans)
                const name = ans.name
                console.log(name)
                return this.connection.promise().query('INSERT INTO role (title, department_id,salary) VALUES (?,?,?)', [ans.name, ans.department, ans.salary] ,(err, results) => {
                   console.log('success!')
                })
    
            }).catch(err => {
                console.log(err)
            })
        })
    }
}


module.exports = Role