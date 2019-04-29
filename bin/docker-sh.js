#! /usr/bin/env node

const dockerCommand = require('../src/docker-command');

const dockerSh = dockerId => ['exec', '-it', dockerId,'/bin/sh'];

dockerCommand(dockerSh, true);
