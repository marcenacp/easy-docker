const child_process = require('child_process');
const util = require('util');
const exec = util.promisify(child_process.exec);

const inquirer = require('inquirer');

const { SEPARATOR, VALUE, execCommand, formatDockerPsOutput } = require('./services');

const launchCommand = (dockerCommand, interactiveMode) =>
  exec(`docker ps --format \'{{.ID}}${SEPARATOR}{{.Image}}${SEPARATOR}{{.Names}}\'`)
    .then(({ stdout }) => {
      const runningDockers = formatDockerPsOutput(stdout);

      if (runningDockers.length === 0)
        return new Exception('No running Docker');

      if (runningDockers.length === 1)
        return execCommand(dockerCommand(runningDockers[0][VALUE]), interactiveMode);

      return inquirer.prompt({
        type: 'list',
        name: 'chosenDockerId',
        message: 'Choose a Docker',
        choices: runningDockers,
      });
    })
    .then(answers =>
      execCommand(dockerCommand(answers.chosenDockerId), interactiveMode))
    .catch(error => console.log(`Error when launching Docker: ${error}`));

module.exports = launchCommand;
