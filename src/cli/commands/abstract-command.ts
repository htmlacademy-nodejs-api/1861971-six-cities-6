import { Command } from './command.interface.js';

export abstract class AbstractCommand implements Command {
  abstract get name(): string;

  abstract execute(...parameters: string[]): void;
}
