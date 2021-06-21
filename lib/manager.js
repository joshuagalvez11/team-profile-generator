const Employee = require('./employee');

class Manager extends Employee {
    constructor(name, id, email, office){
        super(name, id, email);
        this.officeNumber = office;
    }
    getRole(){
        return 'Manager';
    }
    getOfficeNumber(){
        return this.officeNumber;
    }
}

module.exports = Manager;