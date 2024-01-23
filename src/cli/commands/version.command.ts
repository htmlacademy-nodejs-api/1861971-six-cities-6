import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { AbstractCommand } from './abstract-command.js';
import { getErrorMessage } from '../../shared/helpers/common.js';
import { COLOR_ERROR, COLOR_SUCCESS } from '../../shared/const/const.js';

type PackageJSONConfig = {
  version: string;
}

function isPackageJSONConfig(value: unknown): value is PackageJSONConfig {
  return (
    typeof value === 'object' &&
    value !== null &&
    !Array.isArray(value) &&
    Object.hasOwn(value, 'version')
  );
}

export class VersionCommand extends AbstractCommand {
  private readonly filePath = 'package.json';

  private async readVersion(): Promise<string> {
    const jsonContent = await readFile(resolve(this.filePath), 'utf-8');
    const importedContent: unknown = JSON.parse(jsonContent);

    if (! isPackageJSONConfig(importedContent)) {
      throw new Error(COLOR_ERROR('Failed to parse json content.'));
    }

    return importedContent.version;
  }

  public get name(): string {
    return '--version';
  }

  public async execute(..._parameters: string[]): Promise<void> {
    try {
      const version = await this.readVersion();
      console.info(COLOR_SUCCESS(`Версии приложения: ${version}`));
    } catch (error: unknown) {
      console.error(COLOR_ERROR(`Failed to read version from ${this.filePath}`));
      console.error(COLOR_ERROR(getErrorMessage(error)));
    }
  }
}
