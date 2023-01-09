import { Container } from './hostConfig';
import { FiberNode, FiberRootNode } from './fiberNode';
import { HostRoot } from './worktag';
import { createUpdateQueue, CreateUpdate, enUpdateQueue, UpdateQueue } from './updateQueue';
import { scheduleUpdateOnFilber } from './workLoop';
import { REACT_ELEMENT } from '../../shared/ReactTypes';
// 挂载时调用api ，这里有两个 createContainer 和 UpdateContainer

//这个在我的理解适用于第一次创建即 RenderDOM.createRoot()
export function createContainer(container: Container) {
  const HostRootFiber = new FiberNode(HostRoot, {}, null);
  // 创建根实例 root.current  = HOStRootFiber，后面的大部分操作我们都交过HostRootFiber来操作
  const root = new FiberRootNode(container, HostRootFiber);
  HostRootFiber.updateQueue = createUpdateQueue();
  // root{curent:HostROotFiber:{stateNode:root,updateQueue:{shared:{pending:null}}}}
  return root;
}

//这个适用于我们更新的时候去使用的 想要看更了解的我在updateQueue 上面简单介绍了一下 （比如render setState）
// render 完成第一次 副作用的入队列中
export function UpdateContainer(element: REACT_ELEMENT | null, root: FiberRootNode) {
  const HostRootFiber = root.current;
  //  element 比如 <app />传入 生成第一个 update
  const update = CreateUpdate<REACT_ELEMENT | null>(element);
  // 将update 添加到队列里面
  enUpdateQueue(HostRootFiber.updateQueue as UpdateQueue<REACT_ELEMENT | null>, update);
  scheduleUpdateOnFilber(HostRootFiber);
  // 最后将elelment传出
  return element;
}
