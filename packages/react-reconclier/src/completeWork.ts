import { FiberNode } from './fiberNode';
import { HostComponent, HostRoot, HostText } from './worktag';
import { createInstance, appendInitalChild } from './hostConfig';
import { NoFlags } from './fiberFlags';
//归阶段
//在递归阶段我们主要做两件事 1.渲染离屏Dom树 2. 标记Update Flag
// 在归的时候构建dom树
export const completeWork = (wip: FiberNode): any => {
  // 构建离屏dom 树 所需要的属性
  const pendPros = wip.pendingProps;
  // 拿到当前的树
  const current = wip.alternate;

  switch (wip.tag) {
    case HostRoot:
      break;
    case HostComponent:
      // update的状态  stateNode dom节点
      if (current !== null && wip.stateNode) {
        return null;
      } else {
        //构建离屏的dom树 构建dom  将dom插入dom树当中
        const instance = createInstance(wip.type, pendPros);
        appendAllChildren(instance, wip);
        wip.stateNode = instance;
      }
      bubble(wip);
      return null;
    case HostText:
      // update的状态  stateNode dom节点
      if (current !== null && wip.stateNode) {
        return null;
      } else {
        //构建离屏的dom树 构建dom  将dom插入dom树当中
        const instance = createInstance(pendPros.content);
        wip.stateNode = instance;
      }
      bubble(wip);
      return null;
    default:
      break;
  }
};

/**
 * @param parent desc:dom树
 *@param wip desc:要插入的节点
 * @return
 * **/
// 比如 <A><B/><B/></A>  B=> <div><span>1</span></div>
/**
 * 我们现在是想将两个 b插入到 a当中
 *  我们传入的分别是 A B
 *  我们先拿到b FiberNode中的  child
 * 首先进行判断  如果 node！== 我们接着往下遍历 如果已经遍历到对应div 或者是 1
 * 那么我们去创建对应的dom 实例
 * 我们拿到实例将实例挂载到离屏的dom树
 * 如果不是有子元素 因为我们使用的是dfs 深度优先 我们为了拿到子元素 我们先保持链接 让node的子元素的父元素 指回自己 然后 node去往下
 * **/
function appendAllChildren(parent: any, wip: FiberNode) {
  // 获取要插入的node
  let node = wip.child;
  while (node !== null) {
    //判断node的tag是否是节点或者是文本
    if (node?.tag === HostComponent || node?.tag === HostText) {
      // TODO 完成插入的动作
      //递归的过程
      appendInitalChild(parent, node.stateNode);
    } else if (node.child !== null) {
      node.child.return = node;
      node = node.child;
      continue;
    }
    if (node === wip) {
      return;
    }
    while (node.sibling === null) {
      if (node.return === null || node.return === wip) {
        return;
      }
      node = node?.return;
    }
    node.sibling.return = node.return;
    node = node.sibling;
  }
}

function bubble(wip: FiberNode) {
  let subtreeFlags = NoFlags;
  let child = wip.child;
  while (child !== null) {
    subtreeFlags |= child.subtreeFlags;
    subtreeFlags |= child.flag;

    child.return = wip;
    child = child.sibling;
  }
  wip.subtreeFlags |= subtreeFlags;
}
