const inquirer = require('inquirer');
const Employee = require('./lib/employee');
const Engineer = require('./lib/engineer');
const Manager = require('./lib/manager');
const Intern = require('./lib/Intern');
const fs = require('fs');
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
                display();
                return console.log(employees);
                
            }
            
            
        }
    );
    return;
    display();
    
}

function display(){
    var htmlstr = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="./style.css" />
        <title>Team</title>
    </head>
    <body>
    `;
    
    for(var i = 0; i < employees.length; i++){  
        htmlstr += 
    `<div class="employee">
        <h1>name: ${employees[i].getName()}</h1>
        <h2>role: ${employees[i].getRole()}</h2>
        <p>id: ${employees[i].getId()}</p>
        <p>email: <a href="mailto:${employees[i].getEmail()}">${employees[i].getEmail()}</a></p>
    `;
    if(employees[i].getRole() === 'Manager'){
        htmlstr += 
        `<p>office number: ${employees[i].getOfficeNumber()}</p>
        `;
    }else if(employees[i].getRole() === 'Engineer'){
        htmlstr += 
        `<p>github: <a href="${employees[i].getGithub()}">${employees[i].getGithub()}</a></p>
        `;
    }else if(employees[i].getRole() === 'Intern'){
        htmlstr += 
        `<p>school: ${employees[i].getSchool()}</p>
        </div>
        `;
    }
    }

    htmlstr += 
    `</body>
    </html>`;
    fs.appendFile('home.html', `${htmlstr}\n`, (err) =>
        err ? console.error(err) : console.log(htmlstr)
    );

}


async function run(){    
    const employees = await promptEmployee('manager');
}

run();
