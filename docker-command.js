const child_process = require('child_process')
const util = require('util');
const exec = util.promisify(child_process.exec);
const execFileSync = child_process.execFileSync;

const inquirer = require('inquirer');

const NAME = 'name';
const SEPARATOR = '------------';
const VALUE = 'value';

const addBlankSpaces = string => string.padEnd(50, ' ');

const prettyPrint = (image, names, id) =>
  `${addBlankSpaces(image)}${addBlankSpaces(`(${names})`)}${addBlankSpaces(`[${id}]`)}`;

const launchCommand= dockerCommand =>
  exec(`docker ps --format \'{{.ID}}${SEPARATOR}{{.Image}}${SEPARATOR}{{.Names}}\'`)
  .then(({ stdout, stderr }) => {
    const runningDockers = stdout
      .split('\n')
      .filter(runningDocker => !!runningDocker)
      .map(runningDocker => {
        const [id, image, names] = runningDocker.split(SEPARATOR);
        return {
          [VALUE]: id,
          [NAME]: prettyPrint(image, names, id)
        };
      });

    if (runningDockers.length === 0)
      return new Exception('No running Docker');

    if (runningDockers.length === 1)
      return execFileSync('docker', dockerCommand(runningDockers[VALUE]), { stdio: 'inherit' });

    return inquirer.prompt({
      type: 'list',
      name: 'chosenDockerId',
      message: 'Choose a Docker',
      choices: runningDockers,
    });
  })
  .then(answers =>
    execFileSync('docker', dockerCommand(answers.chosenDockerId), { stdio: 'inherit' }))
  .catch(error => console.log(`Error when launching Docker: ${error}`));

module.exports = launchCommand;
