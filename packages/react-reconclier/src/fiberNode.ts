/*
 * 我们首先先了解什么是reconciler(协调器)
 *
 * 正常的模式(过程驱动)： 就是我们写JavaScript代码=>调用宿主环境=>宿主调用自己的api
 *
 * reconciler(使用状态驱动的方式)：描述的ui => 运行时核心代码 => 调用宿主环境=>宿主调用自己的api
 * 这里做一些扩展 描述的ui (通常情况下有两种一种是类似于JSX ,另一种就是Template（模板语法）)
 * 这就是你即使在写vue3中使用jsx插件，写jsx代码，vue3仍然能执行。因为在我看来他们最好转换的产物应该是一样的，应该都是JavaScript对象
 * 运行时核心代码 这里也有两种，说两种也不准确，1. react 实现的 reconciler 2、vue实现的renderer 我只能说这是我认识的两种
 * 不同的矿建，也可以自己去实现，但是最终的想要结果就是想调用宿主环境api
 * 并且在这里react没有编译优化，是一个纯运行时框架
 *
 * 那么我们就能理解 reconciler 其实就是消费jsx 将jsx => ReactElement(只是自己的结点) => ? => 宿主环境 中间的桥梁
 * 这个？是什么就是我们常说的虚拟DOM 在React中就是FilberNode
 * 这种数据结构我们不但希望他是 一种存储单元同时我们还希望他是一种工作单元
 */

import { Key, Props, Ref, Type } from 'shared/ReactTypes';
import { WorkTag } from './worktag';
import { Flags, NoFlags } from './fiberFlags';
import { Container } from 'hostConfig';
// 创建filberNode 这种结构

/**
 * @param tag:WorkTag desc:标记 
 * @param pendingProps:Prop desc:本次渲染所需的props  
   @param key: null | string,  desc:key 比如循环使用key 进行diff算法
 * **/

export class FiberNode {
  type: Type;
  tag: WorkTag;
  key: Key;
  pendingProps: Props;
  stateNode: any;
  ref: Ref;
  alternate: FiberNode | null;
  return: FiberNode | null;
  child: FiberNode | null;
  sibling: FiberNode | null;
  index: number;
  memoizedProps: Props | null;
  memoizedState: any;
  updateQueue: unknown;
  flag: Flags;
  constructor(tag: WorkTag, pendingProps: Props, key: Key) {
    //Instance
    this.tag = tag;
    this.key = key;
    // 与fiber关联的功能或类，如<div>,指向对应的类或函数
    this.type = null;
    //实际的div
    this.stateNode = null;

    //Fiber 这里存放着l链表相关的结构
    this.return = null;
    this.child = null;
    this.sibling = null;
    this.index = 0;
    this.alternate = null;
    this.ref = null;

    //工作单元
    //本次旋绕需要的props
    this.pendingProps = pendingProps;
    //上次渲染所需的props
    this.memoizedProps = null;
    this.memoizedProps = null;
    this.updateQueue = null;
    //副作用
    this.flag = NoFlags;
  }
}

// 根节点
export class FiberRootNode {
  // 比如使用 const root = ReactDOM.createRoot(document.getElementById('root'));
  //root.render(<Hello toWhat="World" />, );
  // container 就相当于征程document.getById() 拿到的DOM 元素 但是 在这里 还要区分组件 实例创建的 或者是 null 所以单独拿出来一个Container
  // 比如 DOM FC Class Null
  container: Container;
  // current相当于子树 FiberRootNode是唯一树 ，在我的理解可以理解成一个单一的实例
  //我们每次更新不可能都将实例更新，所以每次更新HostRootFiber,更新以后再将 FiberRootNode.current => HostRootFiber上面
  current: FiberNode;
  // 完成更新的HostRootFiber 可能有人会问 我不是在current已经绑定了HostRootFiber了吗  在我的认为当中 ，current表示正在构建的
  // finishWork表示是已经递归完成的,如果是第一次的话是null
  finishWork: FiberNode | null;
  constructor(container: Container, HostRootFiber: FiberNode) {
    this.container = container;
    this.current = HostRootFiber;
    HostRootFiber.stateNode = this;
    this.finishWork = null;
  }
}

/**
 * React 的流是这样 有两种树
 * 1、一种是 WorkInProgress表示当前正在构建的树
 *2、 第二种是 current表示正在试图层渲染的树
 * react 为了解决渲染白屏的问题 ： 他会在WOrkInprogrss 绘制完成，Root 指向他之前一直使用 current
 * 构建workInprogress
 * **/
export function createWorkInProgress(current: FiberNode, pendingProps: any) {
  // 首先我们要了解 WorkInprogress  两棵树 通过alternate相互依赖
  //就像是我们写代码 有时候我们不知道写的是否正确,我们可能会从github上先把代码拷贝下来，然后在本地写代码，然后编写、测试后发现没问题了。我们在提交上去
  // 在提交之前github你提交的那条分支的代码始终是那条分支的、不会说你拷贝下来代码就没了，非要等你在上传代码才会生效
  let workInProgress = current.alternate;
  //判断是否存在如果不存在那么就是首屏渲染 也就是mount阶段
  if (workInProgress === null) {
    // 没有我们创建一个节点
    workInProgress = new FiberNode(current.tag, pendingProps, current.key);
  } else {
    // 否则的话就是 update阶段
    workInProgress.flag = NoFlags;
    workInProgress.pendingProps = pendingProps;
  }
  workInProgress.type = current.type;
  workInProgress.updateQueue = current.updateQueue;
  workInProgress.child = current.child;
  workInProgress.memoizedProps = current.memoizedProps;
  workInProgress.memoizedState = current.memoizedState;

  return workInProgress;
}
