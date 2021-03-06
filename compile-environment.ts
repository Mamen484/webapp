#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const pathToEnvironments = process.argv[2] || './src/environments/';
const environmentFilesDirectory = path.join(__dirname, pathToEnvironments);
import(path.join(environmentFilesDirectory, 'environment'))
    .then(({environment}) => compileEnvironment(environment),
        error => 'Compile failed: ' + console.log(error));


function compileEnvironment(environment) {
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
}
