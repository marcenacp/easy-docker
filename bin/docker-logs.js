#! /usr/bin/env node

const dockerCommand = require('../src/docker-command');

const dockerLogs = dockerId => ['logs', '--follow', dockerId];

dockerCommand(dockerLogs, true);
