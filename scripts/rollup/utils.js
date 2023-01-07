/* eslint-disable no-undef */
import path from 'path';
import fs from 'fs';

import ts from 'rollup-plugin-typescript2';
import cjs from '@rollup/plugin-commonjs';

//默认的源码路径
const pkgPath = path.resolve(__dirname, '../../packages');
// 因为看源码打包的 类似于  react 、 reactDom 这种包 会打包放在build/node_moudle 里面
const distPath = path.resolve(__dirname, '../../build/node_modules');

// 解析 路径
// 举个栗子 ： /packages/react  /buld/node+moudles/react
//因为路径分两种一种是打包的路径一种是源码的路径
export function resolvePkgPath(packageName, isDist) {
  if (isDist) {
    return `${distPath}/${packageName}`;
  }
  return `${pkgPath}/${packageName}`;
}

//接卸package.json  /packages/react 获取到了他pakcage.json => {name:"react"...}
export function getPackageJSON(pkgName) {
  //找到package.json
  const path = `${resolvePkgPath(pkgName)}/package.json`;
  // 使用fs模块读取文件。因为这个地方读取的是字符串
  const str = fs.readFileSync(path, { encoding: 'utf-8' });
  // 解析字符串
  return JSON.parse(str);
}

// 获取所有的基础的plugin 解析成commonjs 和 将ts->js 的plugin
/**
 * 1. ts->js rollup-plugin-typescript2
 * 2. commonjs @rollup/plugin-commonjs
 *
 * install 这两个包
 * **/
export function getBaseRollupPlugins({ typescript = {} } = {}) {
  return [cjs(), ts(typescript)];
}
