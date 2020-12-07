const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
let teamProfile = [];

//Questions for Manager
const managerQn = [
  {
    type: "input",
    message: "Enter the name of the manager",
    name: "name",
  },
  {
    type: "number",
    message: "Enter the manager's ID",
    name: "id",
  },
  {
    type: "input",
    message: "Enter the manager's email",
    name: "email",
  },
  {
    type: "number",
    message: "Enter the manager's office number",
    name: "officeNum",
  },
  {
    type: "list",
    name: "addTeam",
    message: "Do you want to add your team members?",
    choices: ["Yes", "No"],
  },
];

//Question for Team Members
const teamQn = [
  {
    type: "list",
    message: "Select a position",
    name: "role",
    choices: ["Engineer", "Intern"],
  },
  {
    type: "input",
    message: "Enter the name of the person holding this position",
    name: "name",
  },
  {
    type: "number",
    message: "Enter the person's ID.",
    name: "id",
  },
  {
    type: "input",
    message: "Enter the person's email.",
    name: "email",
  },
  {
    type: "input",
    message: "What is the enginner's Github username?",
    name: "github",
    when: (answers) => answers.role === "Engineer",
  },
  {
    type: "input",
    message: "What is the intern's school?",
    name: "school",
    when: (answers) => answers.role === "Intern",
  },
  {
    type: "list",
    name: "addAnother",
    message: "Do you want to add another team member?",
    choices: ["Yes", "No"],
  },
];


//Function to initialize program
const init = () => {
  inquirer.prompt(managerQn).then((managerData) => {
    let managerProfile = new Manager(
      managerData.name,
      id,
      managerData.email,
      managerData.officeNum
    );
    teamProfile.push(managerProfile);
    if (managerData.addAnother === "Yes") {
      addMember();
    } else {
      generatePage();
    }
  });
};

//Function call to initialize program
init();


// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML inclu  ding templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
