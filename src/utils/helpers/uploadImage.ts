import { extname } from 'path';
import { FileUpload } from 'graphql-upload';
import * as fs from 'fs';
import { ImageType } from '../enum/imagePath.enum';

export async function uploadImage(
  image: FileUpload,
  type: ImageType,
): Promise<string> {
  const { createReadStream, filename } = await image;

  const dir = `./uploads/${type}`;

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const validExtensions = ['.jpg', '.jpeg', '.png'];
  const ext = extname(filename).toLowerCase();

  if (!validExtensions.includes(ext)) {
    throw new Error(
      'Invalid file type. Please upload a JPG, JPEG, or PNG file.',
    );
  }

  const stream = createReadStream();
  const randomName = Array(32)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');
  const savePath = `${new Date().getTime()}_${randomName}.jpg`;

  await new Promise<void>((resolve, reject) =>
    stream
      .pipe(fs.createWriteStream(`${dir}/${savePath}`))
      .on('finish', () => resolve())
      .on('error', (error) => reject(error)),
  );

  return savePath;
}
