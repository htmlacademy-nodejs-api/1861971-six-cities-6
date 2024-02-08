import got from 'got';
import { AbstractCommand } from './abstract-command.js';
import { MockServerData } from '../../shared/types/index.js';
import { TSVOfferGenerator } from '../../shared/libs/offer-generator/tsv-offer-generator.js';
import { TSVFileWriter } from '../../shared/libs/file-writer/tsv-file-writer.js';
import { getErrorMessage } from '../../shared/helpers/common.js';
import { COLOR_SUCCESS, COLOR_ERROR } from '../../shared/const/const.js';

export class GenerateCommand extends AbstractCommand {
  private initialData: MockServerData;

  private async load(url: string) {
    try {
      this.initialData = await got.get(url).json();
    } catch {
      throw new Error(COLOR_ERROR(`Can't load data from ${url}`));
    }
  }

  private async write(filepath: string, offerCount: number) {
    const tsvOfferGenerator = new TSVOfferGenerator(this.initialData);
    const tsvFileWriter = new TSVFileWriter(filepath);

    for (let i = 0; i < offerCount; i++) {
      await tsvFileWriter.write(tsvOfferGenerator.generate());
    }
  }

  public get name(): string {
    return '--generate';
  }

  public async execute(...parameters: string[]): Promise<void> {
    const [count, filepath, url] = parameters;
    const offerCount = Number.parseInt(count, 10);

    try {
      await this.load(url);
      await this.write(filepath, offerCount);
      console.info(COLOR_SUCCESS(`File ${filepath} was created!`));
    } catch (error: unknown) {
      console.error(COLOR_ERROR('Can\'t generate data'));
      console.error(COLOR_ERROR(getErrorMessage(error)));
    }
  }
}
