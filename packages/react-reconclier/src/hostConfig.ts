// 我们要在ts.config中声明因为 每个环境其实都需要hostConfig 比如 react-dom 就要在dom包下面
export type Container = any;

//目前我们可以暂时去模拟实现一下对应dom结构 最终这种东西要在不同的dom结构中实现
export const createInstance = (...args: any) => {
  //TODO完成创建节点
  return {};
};
export const createTextInstance = (...args: any) => {
  //TODO完成创建文本节点
  return {};
};
export const appendInitalChild = (...args: any) => {
  // TODO完成对应的appendInitalChild部分
  return {};
};
