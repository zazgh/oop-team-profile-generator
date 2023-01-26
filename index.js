const Employee = require ("./Develop/lib/Engineer")
const Manager = require ("./Develop/lib/Manager")
const Engineer = require ("./Develop/lib/Engineer")
const Intern = require ("./Develop/lib/Intern")
const fs = require ("fs")
const inquirer = require("inquirer")
const generateHtml = require('./Develop/util/generateHtml.js')
const baseQuestions = [
    {
        name: "name",
        type: "input",
        message: "enter manager name",
        validate: validateInput,
    },
    {
        name: "id",
        type: "input",
        message: "enter id",
        validate: validateInput,
    },
    {
        name: "email",
        type: "input",
        message: "enter email",
        validate: validateInput,
    }
];

function validateInput (input) {
    if (input == "") {
        return "input is required to continue";
    } else {
        return true;
    }
}
//manager
function addManager() {
    var questions = []
    baseQuestions.forEach(q => questions.push(q))
    questions.push(
        {
            name: "officeNumber",
            type: "input",
            message: "enter officeNumber",
            validate: validateInput,
        },
    ) 

    inquirer.prompt(questions)
    .then(ans => {
        const newManager= new Manager(ans.name, ans.id, ans.email, ans.officeNumber)
        team.push(newManager)
        askQuestion()

    })
}
//engineer
function addEngineer() {
    var questions = []
    baseQuestions.forEach(q => questions.push(q))
    questions.push(
        {
            name: "github",
            type: "input",
            message: "enter github",
            validate: validateInput,
        },
    ) 

    inquirer.prompt(questions)
    .then(ans => {
        const newEngineer= new Engineer(ans.name, ans.id, ans.email, ans.github)
        team.push(newEngineer)
        askQuestion()

    })
}
//intern
function addIntern() {
    var questions = []
    baseQuestions.forEach(q => questions.push(q))
    questions.push(
        {
            name: "school",
            type: "input",
            message: "enter school",
            validate: validateInput,
        },
    ) 

    inquirer.prompt(questions)
    .then(ans => {
        const newIntern= new Intern(ans.name, ans.id, ans.email, ans.school)
        team.push(newIntern)
        askQuestion()

    })
}
///////////
let team = []

function askQuestion()
{
    inquirer.prompt([ 
        {
            name: "employeeType",
            type: "list",
            message: "select employeeType",
            choices: ["Manager", "Engineer", "Intern", "Finish and generate HTML"],
            validate: validateInput,
        }
    ])
    .then(ans => {
        switch (ans.employeeType)
        { 
            case "Manager":
                addManager();
                break;

            case "Engineer":
                addEngineer();
                break;

            case "Intern":
                addIntern();
                break;

            default:            
                generateTeam(team)
                break;
        }
    })
}

function generateTeam(team){
    fs.writeFile("index.html",generateHtml(team), (err) =>{
        if(err){
            throw err
        }
    })
}

askQuestion()
