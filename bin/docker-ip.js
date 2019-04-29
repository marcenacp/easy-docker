#! /usr/bin/env node

const dockerCommand = require('../src/docker-command');

const dockerIp = dockerId => ['inspect', '-f', '\'{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}\'', dockerId];

dockerCommand(dockerIp, true);
