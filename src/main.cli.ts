#!/usr/bin/env node

import {
  CLIApplication,
  HelpCommand,
  VersionCommand,
  ImportCommand
} from './cli/index.js';

function bootstrap() {
  const cliApplication = new CLIApplication();
  cliApplication.registerCommands([
    new HelpCommand(),
    new VersionCommand(),
    new ImportCommand()
  ]);

  //process.argv.push('--version');
  //process.argv.push('--import');
  //process.argv.push('C:/Users/User/Desktop/1861971-six-cities-6/mocks/mock-data.tsv');
  cliApplication.processCommand(process.argv);
}

bootstrap();
