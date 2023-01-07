import { FiberNode } from './fiberNode';
import { beginWork } from './beginWork';
import { completeWork } from './completeWork';
// workInprogress 表示正在构建的树 在这里也可以理解成指针
let workInProgress: FiberNode | null = null;

function prepareFreshStack(fiber: FiberNode) {
  workInProgress = fiber;
}
// 首次构建应用， 创建一个 fiberRoot ，作为整个 React 应用的根基
function renderRoot(root: FiberNode) {
  //完成了对应的初始化
  prepareFreshStack(root);
  do {
    try {
      workLoop();
      break;
    } catch (error) {
      console.warn(error);
      workInProgress = null;
    }
    // eslint-disable-next-line no-constant-condition
  } while (true);
}
// workLoop就是每一个单元的调度器 就是开启遍历的开关
function workLoop() {
  while (workInProgress !== null) {
    performUnitOfWork(workInProgress);
  }
}

function performUnitOfWork(fiber: FiberNode) {
  // next 这里可能是 子fiber 或者是 null
  const next = beginWork(fiber);
  // 然后让当前一个变成上一个，然后好开始指向下一个
  fiber.memoizedProps = fiber.pendingProps;
  //如果next === null 相当于 递的过程已经完成了
  if (next === null) {
    comformUnitOfWork(fiber);
  } else {
    // 如果不等于null那么接着往下走
    workInProgress = next;
  }
}
// 因为我们这个是dfs ，所以我们目前只记录了最后一个元素 ，然后开始完成归的咋欧总
function comformUnitOfWork(fiber: FiberNode) {
  let node: FiberNode | null = fiber;
  do {
    completeWork(node);
    // 拿到兄弟元素
    const sibling = node.sibling;
    if (sibling !== null) {
      //指针变成兄弟元素的
      workInProgress = sibling;
      return;
    }
    //指向父级元素
    node = node.return;
    //指针指向父级元素
    workInProgress = node;
  } while (node !== null);
}
