import { copyFile, mkdir, constants } from 'node:fs';
import { join } from 'node:path';

const distDir = join(process.cwd(), 'dist');
const sourcePath = join(distDir, 'index.html');
const targetPath = join(distDir, '404.html');

// Routes that must answer with 200 (not the 404 fallback), e.g. for app-store privacy policy URLs.
const staticRoutes = ['garden-maze/privacy'];

copyFile(sourcePath, targetPath, constants.COPYFILE_FICLONE, (error) => {
  if (error) {
    console.error('[create404] Failed to copy index.html to 404.html:', error);
    process.exit(1);
  } else {
    console.log('[create404] 404.html created for SPA fallback.');
  }
});

staticRoutes.forEach((route) => {
  const routeDir = join(distDir, route);
  mkdir(routeDir, { recursive: true }, (mkdirError) => {
    if (mkdirError) {
      console.error(`[create404] Failed to create ${route}:`, mkdirError);
      process.exit(1);
    }
    copyFile(sourcePath, join(routeDir, 'index.html'), constants.COPYFILE_FICLONE, (copyError) => {
      if (copyError) {
        console.error(`[create404] Failed to write ${route}/index.html:`, copyError);
        process.exit(1);
      }
      console.log(`[create404] /${route}/ created as a static route.`);
    });
  });
});
