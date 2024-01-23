import { AbstractCommand } from './abstract-command.js';
import { TSVFileReader } from '../../shared/file-reader/tsv-file-reader.js';
import { createOffer } from '../../shared/helpers/offer.js';
import { getErrorMessage } from '../../shared/helpers/common.js';
import { COLOR_SUCCESS, COLOR_ERROR } from '../../shared/const/const.js';

export class ImportCommand extends AbstractCommand {
  public get name(): string {
    return '--import';
  }

  private onImportedLine(line: string) {
    const offer = createOffer(line);
    console.info(offer);
  }

  private onCompleteImport(count: number) {
    console.info(COLOR_SUCCESS(`${count} rows imported.`));
  }

  public async execute(...parameters: string[]): Promise<void> {
    const [filename] = parameters;
    const fileReader = new TSVFileReader(filename.trim());

    fileReader.on('line', this.onImportedLine);
    fileReader.on('end', this.onCompleteImport);

    try {
      await fileReader.read();
    } catch (err) {
      console.error(COLOR_ERROR(`Can't import data from file: ${filename}`));
      console.error(COLOR_ERROR(getErrorMessage(err)));
    }
  }
}
