import { FiberNode } from './fiberNode';
// 这个函数开始真正的消费我们jsx代码
// 注：react结构的更新和创建都走  dfs

/**
 * 简单介绍一下深度遍历
 * 在我看来就是比方有一棵树 我们沿着第一个指定的点一直往下走，
 * 走到这条路径都被访问了，然后走下一条路径
 * 具体的话可以看一下（学习JavaScript的数据结构或者找一下其他的资料）
 * **/

export const beginWork = (fiber: FiberNode): any => {
  console.log(`${fiber.key} start`);
};
