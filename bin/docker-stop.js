#! /usr/bin/env node

const dockerCommand = require('../src/docker-command');

const dockerStop = dockerId => ['stop', dockerId];

dockerCommand(dockerStop, false);
