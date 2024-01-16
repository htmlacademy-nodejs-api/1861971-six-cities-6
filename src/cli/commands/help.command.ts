import chalk from 'chalk';
import { AbstractCommand } from './abstract-command.js';

export class HelpCommand extends AbstractCommand {
  public get name(): string {
    return '--help';
  }

  public async execute(..._parameters: string[]): Promise<void> {
    console.info(chalk.red(`
        ${chalk.bold.underline('Программа для подготовки данных для REST API сервера.')}
        ${chalk.italic('Пример')}:
            cli.js --<command> [--arguments]
            ${chalk.italic('Аргументы')}:
            ${chalk.yellow('--version')}:                   # выводит информацию о версии приложения
            ${chalk.yellow('--help')}:                      # выводит список и описание всех поддерживаемых аргументов
            ${chalk.yellow('--import <path>')}:             # импортирует в базу данных информацию из *.tsv-файла.
                                           Путь к файлу передаётся в параметре <path>
            ${chalk.yellow('--generate <n> <path> <url>')}:  # создаёт файл в формате *.tsv с тестовыми данными.
                                           Параметр <n> задаёт количество генерируемых предложений.
                                           Параметр <path> указывает путь для сохранения файла с предложениями.
                                           Параметр <url> задаёт адрес сервера, с которого необходимо взять данные.
                                           Каждая строка в файле *.tsv содержит всю необходимую информацию для создания одного предложения по аренде (кроме комментариев).
    `));
  }
}
