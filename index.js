const inquirer = require("inquirer");
// const prompts = require("./lib/prompts"); TRY TO REQUIRE THIS
const Tracker = require('./tools/employeeTracker')
const { startChoices } = require('./lib/choices.js')


function start() {
        inquirer.prompt({
                type: "list",
                name: "trackerOption",
                message: "What Would you like to do?",
                choices: startChoices,
              })
        .then(result => Tracker[result.trackerOption]())
        .then(() => start())
        .catch(error => console.log(error));
}

start();