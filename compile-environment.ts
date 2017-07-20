#!/usr/bin/env node
import {environment} from './src/environments/environment';

const fs = require('fs');
const path = require('path');

const environmentFilesDirectory = path.join(__dirname, 'src/environments');
const targetEnvironmentFileName = 'environment.prod.ts';

let newEnvironment = {};
for (let key in environment) {
    newEnvironment[key] = typeof process.env[key] !== 'undefined'
        ? process.env[key]
        : environment[key];
}

let targetEnvironmentFileContent = 'export const environment = ' + JSON.stringify(newEnvironment);

// Write environment file
fs.writeFileSync(path.join(environmentFilesDirectory, targetEnvironmentFileName), targetEnvironmentFileContent);

process.exit(0);
