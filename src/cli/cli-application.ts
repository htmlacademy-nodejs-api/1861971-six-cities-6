import { AbstractCommand } from './commands/abstract-command.js';
import { CommandParser } from './command-parser.js';

export class CLIApplication {
  private commands: Record<string, AbstractCommand> = {};
  private readonly defaultCommand = '--help';

  public registerCommands(commandList: AbstractCommand[]): void {
    this.commands = commandList.reduce((acc, item) => {
      const nameKey = item.name;

      if(this.commands[nameKey]) {
        throw new Error(`Command ${this.commands[nameKey]} is already registered`);
      }

      acc[nameKey] = item;

      return acc;
    },this.commands);
  }

  public getCommand(commandName: string): AbstractCommand {
    return this.commands[commandName] ?? this.getDefaultCommand();
  }

  public getDefaultCommand(): AbstractCommand | never {
    if (! this.commands[this.defaultCommand]) {
      throw new Error(`The default command (${this.defaultCommand}) is not registered.`);
    }
    return this.commands[this.defaultCommand];
  }

  public processCommand(argv: string[]): void {
    const parsedCommand = CommandParser.parse(argv);
    const [commandName] = Object.keys(parsedCommand);
    const command = this.getCommand(commandName);
    const commandArguments = parsedCommand[commandName] ?? [];
    command.execute(...commandArguments);
  }
}
