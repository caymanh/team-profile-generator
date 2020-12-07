const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

//Array to store each member object
let teamProfile = [];

//Questions for Manager
const managerQn = [
  {
    type: "input",
    message: "Enter the name of the manager",
    name: "name",
    validate: async (input) => {
      if (input == "") {
        return "Please enter a name";
      }
      return true;
    },
  },
  {
    type: "number",
    message: "Enter the manager's ID",
    name: "id",
    validate: async (input) => {
      if (isNaN(input)) {
        return "Please enter a number";
      }
      return true;
    },
  },
  {
    type: "input",
    message: "Enter the manager's email",
    name: "email",
    validate: async (input) => {
        if (input == "") {
          return "Please enter an email";
        }
        return true;
      },
  },
  {
    type: "number",
    message: "Enter the manager's office number",
    name: "officeNumber",
    validate: async (input) => {
        if (isNaN(input)) {
          return "Please enter a number";
        }
        return true;
      },
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
    validate: async (input) => {
        if (input == "") {
          return "Please enter a name";
        }
        return true;
      },
  },
  {
    type: "number",
    message: "Enter the person's ID",
    name: "id",
    validate: async (input) => {
        if (isNaN(input)) {
          return "Please enter a number";
        }
        return true;
      },
  },
  {
    type: "input",
    message: "Enter the person's email",
    name: "email",
    validate: async (input) => {
        if (input == "") {
          return "Please enter an email";
        }
        return true;
      },
  },
  {
    type: "input",
    message: "Enter the enginner's Github username",
    name: "github",
    when: (teamData) => teamData.role === "Engineer",
    validate: async (input) => {
        if (input == "") {
          return "Please enter a username";
        }
        return true;
      },
  },
  {
    type: "input",
    message: "Enter the intern's school name",
    name: "school",
    when: (teamData) => teamData.role === "Intern",
    validate: async (input) => {
        if (input == "") {
          return "Please enter a school name";
        }
        return true;
      },
  },
  {
    type: "list",
    name: "addAnother",
    message: "Do you want to add another team member?",
    choices: ["Yes", "No"],
  },
];

//Function to add team members
const addMember = () => {
  let newMember;
  inquirer.prompt(teamQn).then((teamData) => {
    //Either the Enginner or the Intern constructor will be used depending on the manager's input
    if (teamData.role == "Engineer") {
      newMember = new Engineer(
        teamData.name,
        teamData.id,
        teamData.email,
        teamData.github
      );
    } else {
      newMember = new Intern(
        teamData.name,
        teamData.id,
        teamData.email,
        teamData.school
      );
    }
    //The new member will be added to the teamProfile array
    teamProfile.push(newMember);
    //Manager will be asked to add another member. The addMember function will run again if manager answers yes. If no is answered, the HTML page is generated.
    if (teamData.addAnother === "Yes") {
      addMember();
    } else {
      fs.writeFile(outputPath, render(teamProfile), (err) =>
        err ? console.log(err) : console.log("Success!")
      );
    }
  });
};

//Function to initialize program
const init = () => {
  inquirer.prompt(managerQn).then((managerData) => {
    let managerProfile = new Manager(
      managerData.name,
      managerData.id,
      managerData.email,
      managerData.officeNumber
    );
    teamProfile.push(managerProfile);
    //Manager will be asked to add another member. The addMember function will run again if manager answers yes. If no is answered, the HTML page is generated.
    if (managerData.addTeam == "Yes") {
      addMember();
    } else {
      fs.writeFile(outputPath, render(teamProfile), (err) =>
        err ? console.log(err) : console.log("Success!")
      );
    }
  });
};

//Function call to initialize program
init();
