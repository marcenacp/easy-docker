#! /usr/bin/env node

const dockerCommand = require('../src/docker-command');

const dockerRestart = dockerId => ['restart', dockerId];

dockerCommand(dockerRestart, false);
