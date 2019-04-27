#! /usr/bin/env node

const dockerCommand = require('../docker-command');

const dockerStop = dockerId => ['stop', dockerId];

dockerCommand(dockerStop);
