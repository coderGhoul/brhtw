/* eslint-disable no-undef */
import path from 'path';
import fs from 'fs';

import ts from 'rollup-plugin-typescript2';
import replace from '@rollup/plugin-replace';
import cjs from '@rollup/plugin-commonjs';

const pkgPath = path.resolve(__dirname, '../../packages');
const distPath = path.resolve(__dirname, '../../dist/node_modules');

// 解析 路径
// 举个栗子 ： /packages/react  /dist/node+moudles/react
//因为路径分两种一种是打包的路径一种是源码的路径
export function resolvePkgPath(packageName, isDist) {
  if (isDist) {
    return `${distPath}/${packageName}`;
  }
  return `${pkgPath}/${packageName}`;
}

//接卸package.json  /packages/react 获取到了他pakcage.json => {name:"react"...}
export function getPackageJSON(pkgName) {
  const path = `${resolvePkgPath(pkgName)}/package.json`;
  const str = fs.readFileSync(path, { encoding: 'utf-8' });
  return JSON.parse(str);
}
export function getBaseRollupPlugins({
  alias = {
    __LOG__: false,
    preventAssignment: true,
  },
  typescript = {},
} = {}) {
  return [replace(alias), cjs(), ts(typescript)];
}
