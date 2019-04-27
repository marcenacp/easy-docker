const child_process = require('child_process');
const execFileSync = child_process.execFileSync;

const NAME = 'name';
const SEPARATOR = '------------';
const VALUE = 'value';

const addBlankSpaces = string => string.padEnd(50, ' ');

const prettyPrint = (image, names, id) =>
  `${addBlankSpaces(image)}${addBlankSpaces(`(${names})`)}${addBlankSpaces(`[${id}]`)}`;

const execCommand = (dockerCommand, interactiveMode) => {
  if (interactiveMode)
    return execFileSync('docker', dockerCommand, { stdio: 'inherit' });

  return execFileSync('docker', dockerCommand);
};

const formatDockerPsOutput = stdout => stdout
  .split('\n')
  .filter(runningDocker => !!runningDocker)
  .map(runningDocker => {
    const [id, image, names] = runningDocker.split(SEPARATOR);
    return {
      [VALUE]: id,
      [NAME]: prettyPrint(image, names, id)
    };
  });

module.exports = {
  SEPARATOR,
  VALUE,
  execCommand,
  formatDockerPsOutput,
};
