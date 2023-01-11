import { FiberNode } from './fiberNode';
import { HostRoot, HostComponent, HostText } from './worktag';
import { UpdateQueue, processUpdateQueue } from './updateQueue';
import { reconcilerChildFibers, mountChildFibers } from './childFibers';
// 这个函数开始真正的消费我们的fiberNode
// 注：react结构的更新和创建都走  dfs

/**
 * 简单介绍一下深度遍历
 * 在我看来就是比方有一棵树 我们沿着第一个指定的点一直往下走，
 * 走到这条路径都被访问了，然后走下一条路径
 * 具体的话可以看一下（学习JavaScript的数据结构或者找一下其他的资料）
 * **/

// beginwork 对比 组件的current fiberNode 和 ReactElement 生成 wip fiberNode（即正在构建的新树，但是还没有被 current指向）
// 因为只有被root指向的树才是 当前渲染出来的current树
// 为了生成wip fiberNode 我们这里产生相对应的副作用
//这里产生的副作用大概有以下几种： 1.Placement 插入 / 移动
//2.update : 更新fiber 属性相关
//ChildDeletion： 删除fiber
/**
 * @param current desc:正在视图渲染中的树
 * @param wip  desc:workInprogress 正在构建中的树
 * **/
export const beginWork = (current: FiberNode, wip: FiberNode): any => {
  switch (wip.tag) {
    //App :做两件事 计算出最新的状态值 和创建子fiberNode
    case HostRoot:
      return updateHostRoot(wip);
    //div
    case HostComponent:
      return updateHostComponent(wip);
    //111 因为文本节点没有子节点 相当于已经递到最深处
    case HostText:
      return null;
  }
  // console.log(`${fiber.key} start`);
};

/**
 * updateHostRoot应用于  HostRoot的更新
 * 我都理解是也就是组件
 * 这里我们主要做两件事 一件是 消费update单元  (也就是对应的状态的改变)
 * 2、就是增减子树：完成结构上面的改变
 * //最后返回子树
 * @param wip desc:正在渲染中的子树
 *  * **/

function updateHostRoot(wip: FiberNode) {
  const baseState = wip.memoizedState;
  const updateQueue = wip.updateQueue as UpdateQueue<Element>;
  const pendging = updateQueue.shared.pending;
  updateQueue.shared.pending = null;
  const { memoizedState } = processUpdateQueue(baseState, pendging);
  wip.memoizedState = memoizedState;
  // 把两种存储单元进行对比  wip.alternaet.child wip新增的ReactElement
  const nextChildren = wip.memoizedState;
  reconilechildren(wip, nextChildren);
  return wip.child;
}

/***
 * HostComponent
 * 在我的理解就相当于div类似的元素
 *这种元素只涉及到结构层次的变化
 * **/
function updateHostComponent(wip: FiberNode) {
  const nextProps = wip.pendingProps;
  const nextChildren = nextProps.children;
  reconilechildren(wip, nextChildren);
  return wip.child;
}

// 对比当前current滴child 和 新进来的children 生成 wip
function reconilechildren(wip: FiberNode, children: any) {
  const current = wip.alternate;
  // 做一个优化
  if (current !== null) {
    // update
    wip.child = reconcilerChildFibers(wip, current?.child as FiberNode, children);
  } else {
    // mount阶段
    wip.child = mountChildFibers(wip, null, children);
  }
}
