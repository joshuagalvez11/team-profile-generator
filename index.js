const inquirer = require('inquirer');
const Employee = require('./lib/employee');
const Engineer = require('./lib/engineer');
const Manager = require('./lib/manager');
const Intern = require('./lib/Intern');
const { type } = require('os');

const employees = [];


function promptEmployee(type){
    console.log('Enter ' + type + ' info');
    inquirer
    .prompt([
        {
        type: 'input',
          message: 'name: ',
          name: 'name',
        },
        {
        type: 'input',
        message: 'id:  ',
        name: 'id',
        },
        {
        type: 'input',
        message: 'email: ',
        name: 'email',
        }
    ])
    .then((empResponse) =>
        {
            if(type === 'manager'){
                promptManager(empResponse);
            }else if(type === 'engineer'){
                promptEngineer(empResponse);
            }else if(type === 'intern'){
                promptIntern(empResponse);
            }
        }
    );
}

function promptManager(empResponse){
    inquirer
    .prompt([
        {
        type: 'input',
          message: 'office number: ',
          name: 'office',
        }
    ])
    .then((response) =>
        {
            const name = empResponse.name;
            const id = empResponse.id;
            const email = empResponse.email;
            const office = response.office;

            const m = new Manager(name, id, email, office);
            employees.push(m);
            promptEmployeeType();
        }
    );
}

function promptEngineer(empResponse){
    inquirer
    .prompt([
        {
        type: 'input',
          message: 'github: ',
          name: 'github',
        }
    ])
    .then((response) =>
        {
            const name = empResponse.name;
            const id = empResponse.id;
            const email = empResponse.email;
            const github = response.github;

            const e = new Engineer(name, id, email, github);
            employees.push(e);
            promptEmployeeType();
        }
    );
}

function promptIntern(empResponse){
    inquirer
    .prompt([
        {
        type: 'input',
          message: 'school: ',
          name: 'school',
        }
    ])
    .then((response) =>
        {
            const name = empResponse.name;
            const id = empResponse.id;
            const email = empResponse.email;
            const school = response.school;

            const i = new Intern(name, id, email, school);
            employees.push(i);
            promptEmployeeType();
        }
    );
}

const employeeTypes = ['manager', 'engineer', 'intern', 'done'];

function promptEmployeeType(){
    let type;
    inquirer
    .prompt([
        {
          type: 'list',
          message: 'What employee type to enter: ',
          name: 'employeeType',
          choices: employeeTypes
        }
    ])
    .then((response) =>
        {
            const empType = response.employeeType;
            if(empType === 'intern'){
                promptEmployee('intern');
            }else if(empType === 'engineer'){
                promptEmployee('engineer');
            }else if(empType=== 'manager'){
                promptEmployee('manager');
            }else{
                console.log(employees);
                return;
            }
            
            
        }
    );
    return;
    
}

function display(){
    
}

function run(){
    
    promptEmployee('manager');

}

run();
