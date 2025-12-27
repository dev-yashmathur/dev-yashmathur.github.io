import { copyFile, constants } from 'node:fs';
import { join } from 'node:path';

const distDir = join(process.cwd(), 'dist');
const sourcePath = join(distDir, 'index.html');
const targetPath = join(distDir, '404.html');

copyFile(sourcePath, targetPath, constants.COPYFILE_FICLONE, (error) => {
  if (error) {
    console.error('[create404] Failed to copy index.html to 404.html:', error);
    process.exit(1);
  } else {
    console.log('[create404] 404.html created for SPA fallback.');
  }
});
