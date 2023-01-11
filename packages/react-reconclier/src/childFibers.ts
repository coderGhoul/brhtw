import { FiberNode, createFiberFromElement } from './fiberNode';
import { REACT_ELEMENT } from '../../shared/ReactTypes';
import { REACT_ELEMENT_TYPE } from '../../shared/ReactSymbol';
import { HostText } from './worktag';
import { Placement } from './fiberFlags';
function childrenReconciler(shouldTrackEffects: boolean) {
  function reconileSingElement(
    returnFiber: FiberNode,
    currentFiber: FiberNode,
    element: REACT_ELEMENT,
  ) {
    const fiber = createFiberFromElement(element);
    fiber.return = returnFiber;
    return fiber;
  }
  function reconileSingTextNode(
    returnFiber: FiberNode,
    currentFiber: FiberNode,
    content: number | string,
  ) {
    const fiber = new FiberNode(HostText, { content }, null);
    fiber.return = returnFiber;
    return fiber;
  }
  //创建单一节点
  function placeSingleChild(fiber: FiberNode) {
    // 追踪副作用并且渲染的情况下
    if (shouldTrackEffects && FiberNode === null) {
      fiber.flag |= Placement;
    }
    return fiber;
  }
  return function reconilechildrenFibers(
    returnFiber: FiberNode,
    currentFiber: FiberNode | null,
    newChildren?: REACT_ELEMENT,
  ) {
    if (typeof newChildren === 'object' && Object !== null) {
      switch (newChildren.$$typeof) {
        //如果是ReactElement
        case REACT_ELEMENT_TYPE:
          return placeSingleChild(
            reconileSingElement(returnFiber, currentFiber as FiberNode, newChildren),
          );
        default:
          break;
      }
    }
    // TODO多节点铅矿
    // 文本节点
    if (typeof newChildren === 'number' || typeof newChildren === 'string') {
      return placeSingleChild(
        reconileSingTextNode(returnFiber, currentFiber as FiberNode, newChildren),
      );
    }
    return null;
  };
}

//追踪副作用
export const reconcilerChildFibers = childrenReconciler(true);
// 不追踪副作用
export const mountChildFibers = childrenReconciler(false);
