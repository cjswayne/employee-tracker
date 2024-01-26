const inquirer = require("inquirer");
const prompts = require("./lib/prompts"); // TRY TO REQUIRE THIS
const Tracker = require('./tools/employeeTracker')
// const { startChoices } = require('./lib/choices.js')


function start() {
        inquirer.prompt(prompts.startQuestion)
        .then(result => Tracker[result.trackerOption]())
        .then(() => start())
        .catch(error => console.log(error));
}

start();