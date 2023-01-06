import { getPackageJSON, resolvePkgPath, getBaseRollupPlugins } from './utils';
import generatePackageJson from 'rollup-plugin-generate-package-json';

//  这里因为 我的pakcage.json 的name字段正好与我的包名一致所以读取name字段
// model 字段 为 index.ts
const { name, module } = getPackageJSON('react');

// react的包的路径（源码 packages）
const pkgPath = resolvePkgPath(name);
// 打包产物的路径
const pkgDistPath = resolvePkgPath(name, true);

const basePlugins = getBaseRollupPlugins();

// 这里是rollup打包的基本配置 如果不太明白的可以先看一下rollup的文档（如果后续我学明白了rollup 也会写一些最基本的rollup相关的源码分析）
export default [
  {
    input: `${pkgPath}/${module}`,
    output: {
      file: `${pkgDistPath}/index.js`,
      name: 'index.js',
      //  usd 能兼容esm 和commonjs都支持
      format: 'umd',
      plugins: basePlugins,
    },
  },
];
