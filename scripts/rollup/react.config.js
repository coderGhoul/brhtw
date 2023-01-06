import { getPackageJSON, resolvePkgPath, getBaseRollupPlugins } from './utils';
import generatePackageJson from 'rollup-plugin-generate-package-json';

const { name } = getPackageJSON('react');
const pkgPath = resolvePkgPath(name);
const pkgDistPath = resolvePkgPath(name, true);

const basePlugins = getBaseRollupPlugins();

export default [
  {
    input: `${pkgPath}/index.ts`,
    output: {
      file: `${pkgDistPath}/index.js`,
      name: 'index.js',
      //  usd 是esm 和commonjs都支持
      format: 'umd',
      plugins: [
        ...basePlugins,
        generatePackageJson({
          inputFolder: pkgPath,
          outputFolder: pkgDistPath,
          baseContents: ({ name, description, version }) => ({
            name,
            description,
            version,
            main: 'index.js',
          }),
        }),
      ],
    },
  },
  {
    input: `${pkgPath}/src/index.ts`,
    output: {
      file: `${pkgDistPath}/index.js`,
      name: 'index.js',
      //  usd 是esm 和commonjs都支持
      format: 'umd',
    },
  },
];
