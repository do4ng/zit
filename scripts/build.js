/* eslint-disable import/no-extraneous-dependencies */
const esbuild = require('esbuild');
const { nodeExternalsPlugin } = require('esbuild-node-externals');
const { readFileSync, writeFileSync, existsSync, mkdirSync } = require('fs');
const { join } = require('path');

const base = {
  platform: '',
};

const build = (pkg, entryPoint = 'src/browser.ts', out = 'dist/browser.js', cfg = {}) => {
  esbuild
    .build({
      entryPoints: [join(process.cwd(), 'packages', pkg, entryPoint)],
      outfile: join(process.cwd(), 'packages', pkg, out),
      target: 'esnext',
      // plugins: [nodeExternalsPlugin({ packagePath: join(process.cwd(), 'packages', pkg, 'package.json') })],
      ...base,
      ...cfg,
      platform: 'browser',
      bundle: true,
    })
    .then(() => {
      const file = readFileSync(join(__dirname, '../packages/zit/dist/index.js')).toString();

      if (!existsSync(join(__dirname, '../web/dist'))) mkdirSync(join(__dirname, '../web/dist'));

      writeFileSync(join(__dirname, '../web/dist/zit.js'), file);
    });
};
const browser = (pkg, entryPoint = 'src/index.ts', out = 'dist/index.js', cfg = {}) => {
  esbuild.build({
    entryPoints: [join(process.cwd(), 'packages', pkg, entryPoint)],
    outfile: join(process.cwd(), 'packages', pkg, out),
    target: 'esnext',
    ...base,
    ...cfg,
    platform: 'node',
    format: 'esm',

    bundle: true,
  });
};

build('zit');
browser('zit');
