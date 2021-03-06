import { promises as fsPromises } from 'fs';

const checkFileExists = async (
  directory: string,
  inputFile: string
): Promise<boolean> => {
  try {
    await fsPromises.open(`${directory}/${inputFile}`, 'r');
    return true;
  } catch (error) {
    return false;
  }
};

export { checkFileExists };
