//import required modules
const inquirer = require(`inquirer`)
const fs = require(`fs`)
const Engineer = require(`./lib/Engineer`)
const Intern = require(`./lib/Intern`)
const Manager = require(`./lib/Manager`)
//empty array to be populated based on user input with class info
let employeeRoster = []
// template for manager card
const managerCard = employee => {
    return `<div class="card" style="width: 18rem;">
    <div class="card-body">
      <h5 class="card-title">${employee.getName()}</h5>
      <h6 class="card-title">${employee.getRole()}</h6>
      <ul class="list-group list-group-flush">
      <li class="list-group-item">${employee.getId()}</li>
      <li class="list-group-item"><a href="mailto:${employee.getEmail()}">${employee.getEmail()}</a></li>
      <li class="list-group-item">${employee.getOfficeNumber()}</li>
    </ul>
    </div></div>`
}
//template for engineer cad
const engineerCard = employee => {
    return `<div class="card" style="width: 18rem;">
    <div class="card-body">
      <h5 class="card-title">${employee.getName()}</h5>
      <h6 class="card-title">${employee.getRole()}</h6>
      <ul class="list-group list-group-flush">
      <li class="list-group-item">${employee.getId()}</li>
      <li class="list-group-item"><a href="mailto:${employee.getEmail()}">${employee.getEmail()}</a></li>
      <li class="list-group-item"><a href="https://github.com/${employee.getGithub()}">${employee.getGithub()}</a></li>
    </ul>
    </div></div>`
}
// template for intern card
const internCard = employee => {
    return `<div class="card" style="width: 18rem;">
    <div class="card-body">
      <h5 class="card-title">${employee.getName()}</h5>
      <h6 class="card-title">${employee.getRole()}</h6>
      <ul class="list-group list-group-flush">
      <li class="list-group-item">${employee.getId()}</li>
      <li class="list-group-item"><a href="mailto:${employee.getEmail()}">${employee.getEmail()}</a></li>
      <li class="list-group-item">${employee.getSchool()}</li>
    </ul>
    </div></div>`
}
// helper function to build html doc
const renderHTML = cards => {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" crossorigin="anonymous">
        <style>
        .a {
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 6px;
        }
        </style>
        <title>Employee Cards</title>
    </head>
    <body>
        <nav class="navbar mx-auto bg-primary">
            <div class="container">
              <h1>My Team</h1>
            </div>
          </nav>
        <div class="a">${cards}</div>  
    </body>
    </html>`
}
//function to build html doc using previous templates
const renderCards = employeeRoster => {
    let cardArray = [] 
    employeeRoster.forEach(employee => {
        const role = employee.getRole()
        if(role === `Manager`){
           const managerInfo = managerCard(employee)
           cardArray.push(managerInfo)
        }
        if(role === `Engineer`){
           const engineerInfo = engineerCard(employee)
           cardArray.push(engineerInfo)
        }
        if(role === `Intern`){
          const internInfo = internCard(employee)
          cardArray.push(internInfo)
        }})
    const cards = cardArray.join(``)   
    const displayCards = renderHTML(cards)
    return displayCards
}
// prompt for manager
function init() {
    inquirer.prompt([
        {
            type: `input`,
            name: `name`,
            message: `please enter team manager's name: `
        },
        {
            type: `input`,
            name: `id`,
            message: `please enter team manager's id: `
        },
        {
            type: `input`,
            name: `email`,
            message: `please enter team manager's email: `
        },
        {
            type: `input`,
            name: `officeNumber`,
            message: `team manager's office number: `
        }
    ]).then((data) => {
        let currName = data.name
        let currEmail = data.email
        let currId = data.id
        let currOfficeNum = data.officeNumber
        const currManager = new Manager(currName, currId, currEmail, currOfficeNum) //populate manager class with user input
        employeeRoster.push(currManager)
        employeePrompt()
    })
}
// additional prompt for adding employees
function employeePrompt(){
    inquirer.prompt([
        {
            type: `list`,
            name: `role`,
            message: `employee's role`,
            choices: ['Engineer', `Intern`, `Finished Building Team`]
        }]).then((data)=>{
            // if finished building team selected file will be generated
            if(data.role === `Finished Building Team`){
                 fs.writeFile('index.html', renderCards(employeeRoster), (err) =>
                    err ? console.log(err) : console.log(`You've successfully created index.html!`))
        } else {
//prompt for engineer
            if(data.role === `Engineer`) {
                inquirer
                    .prompt([
                        {
                            type: `input`,
                            name: `name`,
                             message: `Please enter ${data.role.trim()}'s name: `
                        },
                        {
                            type: `input`,
                            name: `id`,
                            message: `Please enter ${data.role.trim()}'s id`
                        },
                        {
                            type: `input`,
                            name: `email`,
                            message: `Please enter ${data.role.trim()}'s email: `
                        },
                        {
                            type: `input`,
                            name: `github`,
                            message: `Please enter ${data.role.trim()}'s github user name: `
                        },
                        {
                            type: `confirm`,
                            name: `addMore`,
                            message: `Add more employees?`,
                            default: false
                        }
                    ]).then((data) => {
                        let currName = data.name
                        let currEmail = data.email
                        let currId = data.id
                        let currGithub = data.github
                        let moreEmploy = data.addMore
                        let currEngineer = new Engineer(currName, currId, currEmail, currGithub)
                    employeeRoster.push(currEngineer)
                        if (moreEmploy) {
                            return employeePrompt()
                        } else {
                            fs.writeFile('index.html', renderCards(employeeRoster), (err) =>
                                err ? console.log(err) : console.log(`You've successfully created index.html!`)
                            )
                        }
                    })
            }
            //prompt for intern
            if(data.role === `Intern`) {
                inquirer
                    .prompt([
                        {
                            type: `input`,
                            name: `name`,
                            message: `Please enter ${data.role.trim()}'s name: `
                        },
                        {
                            type: `input`,
                            name: `id`,
                            message: `Please enter ${data.role.trim()}'s id: `
                        },
                        {
                            type: `input`,
                            name: `email`,
                            message: `Please eneter ${data.role.trim()}'s email`
                        },
                        {
                            type: `input`,
                            name: `school`,
                            message: `please enter ${data.role.trim()}'s school`
                        },
                        {
                            type: `confirm`,
                            name: `addMore`,
                            message: `Add more employees?`,
                            default: false
                        }
                    ]).then((data) => {
                        let currName = data.name
                        let currEmail = data.email
                        let currId = data.id
                        let currSchool = data.school
                        let moreEmploy = data.addMore
                        let currIntern = new Intern(currName, currId, currEmail, currSchool)
                        employeeRoster.push(currIntern)
                        if (moreEmploy) {
                            return employeePrompt()
                        } else {
                            fs.writeFile('index.html', renderCards(employeeRoster), (err) =>
                                err ? console.log(err) : console.log(`You've successfully created index.html!`)
                            )
                        }
                    })
            }
        }        
    })
}
// funtion call to initialize app
init()



