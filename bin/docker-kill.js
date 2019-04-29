#! /usr/bin/env node

const dockerCommand = require('../src/docker-command');

const dockerKill = dockerId => ['kill', dockerId];

dockerCommand(dockerKill, false);
