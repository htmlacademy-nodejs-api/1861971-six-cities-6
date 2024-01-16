export interface Command {
  execute(...parameters: string[]): void;
}
