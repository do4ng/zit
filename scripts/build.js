/* eslint-disable import/no-extraneous-dependencies */
const esbuild = require('esbuild');
const { nodeExternalsPlugin } = require('esbuild-node-externals');
const { join } = require('path');

const base = {
  platform: '',
};

const build = (pkg, entryPoint = 'src/index.ts', out = 'dist/node.js', cfg = {}) => {
  esbuild.build({
    entryPoints: [join(process.cwd(), 'packages', pkg, entryPoint)],
    outfile: join(process.cwd(), 'packages', pkg, out),
    target: 'esnext',
    plugins: [nodeExternalsPlugin({ packagePath: join(process.cwd(), 'packages', pkg, 'package.json') })],
    ...base,
    ...cfg,
    platform: 'node',
    bundle: true,
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
