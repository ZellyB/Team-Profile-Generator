const Employee = require("../lib/Employee");
const Intern = require("../lib/Intern");

const generateTeam = (team) => {

  const engineerCard = (eng) => {
    return `
<div class="card m-5">
                <header class="card-header">
                    <p class="card-header-title has-background-info has-text-white is-centered">
                        ${eng.getName()}
                    </p>
                    <p class="card-header-title has-background-info has-text-white is-centered">
                        ${eng.getRole()} <i class="fa-solid fa-code ml-2"></i>
                    </p>
                </header>
                <div class="card-content has-background-white-ter">
                    <div class="content">
                        <table class="table is-bordered is-hoverable">
                            <thead>
                                <tr>
                                    <th>ID: ${eng.getId()}</th>
                                </tr>
                                <tr>
                                    <th>Email: <a href="mailto:${eng.getEmail()}">${eng.getEmail()}</a></th>
                                </tr>
                                <tr>
                                    <th>GitHub: <a href="https://www.github.com/${eng.getGitHub()}" target="_blank" rel="noopener noreferrer">${eng.getGitHub()}</a></th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                </div>
            </div>
`;
  };

  const internCard = (intern) => {
   return `
<div class="card m-5">
                <header class="card-header">
                    <p class="card-header-title has-background-info has-text-white is-centered">
                        ${intern.getName()}
                    </p>
                    <p class="card-header-title has-background-info has-text-white is-centered">
                        ${intern.getRole()} <i class="fa-solid fa-graduation-cap ml-2"></i>
                    </p>
                </header>
                <div class="card-content has-background-white-ter">
                    <div class="content">
                        <table class="table is-bordered is-hoverable">
                            <thead>
                                <tr>
                                    <th>ID: ${intern.getId()}</th>
                                </tr>
                                <tr>
                                    <th>Email: <a href="mailto:${intern.getEmail()}">${intern.getEmail()}</a></th>
                                </tr>
                                <tr>
                                    <th>School: ${intern.getSchool()}</a></th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                </div>
            </div>
`;
  };

  const managerCard = (man) => {
   return `
<div class="card m-5">
                <header class="card-header">
                    <p class="card-header-title has-background-info has-text-white is-centered">
                        ${man.getName()}
                    </p>
                    <p class="card-header-title has-background-info has-text-white is-centered">
                        ${man.getRole()} <i class="fa-brands fa-apple ml-2"></i>
                    </p>
                </header>
                <div class="card-content has-background-white-ter">
                    <div class="content">
                        <table class="table is-bordered is-hoverable">
                            <thead>
                                <tr>
                                    <th>ID: ${man.getId()}</th>
                                </tr>
                                <tr>
                                    <th>Email: <a href="mailto:${man.getEmail()}">${man.getEmail()}</a></th>
                                </tr>
                                <tr>
                                    <th>Office #: ${man.getOfficeNumber()}</a></th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                </div>
            </div>
`;
  };

  const html = [];

  html.push(
    team
      .filter((employee) => employee.getRole() === "Manager")
      .map((manager) => managerCard(manager))
      .join("")
  );
  html.push(
    team
      .filter((employee) => employee.getRole() === "Engineer")
      .map((engineer) => engineerCard(engineer))
      .join("")
  );
  html.push(
    team
      .filter((employee) => employee.getRole() === "Intern")
      .map((intern) => internCard(intern))
      .join("")
  );

  return html.join("");
};

module.exports = (team) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.9.4/css/bulma.min.css" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css" />
    <title>Template</title>
</head>
<body>
    <!-- Title Hero Section -->
    <section class="hero is-danger">
        <div class="columns is-centered m-5">
            <p class="title is-1">Your Team Profile</p>
        </div>
    </section>
    <!-- Cards Section -->
    <div class="columns is-multiline is-centered is-mobile" id="cards-insert">
        ${generateTeam(team)}
    </div>
    <!-- End -->
</body>
</html>`;
};