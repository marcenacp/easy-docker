#! /usr/bin/env node

const dockerCommand = require('../src/docker-command');

const dockerBash = dockerId => ['exec', '-it', dockerId,'/bin/bash'];

dockerCommand(dockerBash, true);
