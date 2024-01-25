const inquirer = require("inquirer");
const questions = require("./lib/prompts");
const Tracker = require('./tools/employeeTracker')

function start() {
    inquirer.prompt(questions).then(result => Tracker[result.trackerOption]());
}

start();

module.exports = start;