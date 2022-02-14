import { transformeImage } from '../utilities/imageTransformer';
import { checkFileExists } from '../utilities/fileChecker';
import { promises as fsPromises } from 'fs';
import * as path from 'path';

class Input {
  fileDirectory: string;
  inputFile: string;
  outputFile: string;
  height: number;
  width: number;

  constructor() {
    this.fileDirectory = path.join(process.cwd(), `/images/`);
    this.inputFile = `friends.jpg`;
    this.outputFile = 'friends_1_1.jpg';
    this.height = 1;
    this.width = 1;
  }
  create(): void {
    this.fileDirectory;
    this.height;
  }
}

const testInput = new Input();

describe('Test if files are been processed and delivered', () => {
  it('an image gets processed', async () => {
    const transformed = await transformeImage(
      testInput.height,
      testInput.width,
      testInput.fileDirectory,
      testInput.inputFile,
      testInput.outputFile
    );
    expect(transformed).toBeTruthy();
  });
  it('an image has been safed', async () => {
    const exists = await checkFileExists(
      testInput.fileDirectory,
      testInput.outputFile
    );
    expect(exists).toBeTruthy();
  });
  // Teardown test image
  afterAll(async () => {
    await fsPromises.unlink(
      `${testInput.fileDirectory}/${testInput.outputFile}`
    );
  });
});

describe('Test error handling of transformer', () => {
  it('returns false if image has not been transformed ', async () => {
    const transformed = await transformeImage(
      testInput.height,
      -1,
      'test',
      testInput.inputFile,
      'test'
    );
    expect(transformed).toEqual(false);
  });
});
