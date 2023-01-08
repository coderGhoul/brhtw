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

// 创建filberNode 这种结构

/**
 * @param tag:WorkTag desc:标记 
 * @param pendingProps:Prop desc:本次渲染所需的props 
   @param key: null | string,  desc:key
 * **/

export class FiberNode {
  type: Type;
  tag: WorkTag;
  key: Key;
  pendingProps: Props;
  stateNode: any;
  ref: Ref;

  return: FiberNode | null;
  child: FiberNode | null;
  sibling: FiberNode | null;
  index: number;
  memoizedProps: Props | null;

  flag: Flags;
  constructor(tag: WorkTag, pendingProps: Props, key: Key) {
    //Instance
    this.tag = tag;
    this.key = key;
    // 与fiber关联的功能或类，如<div>,指向对应的类或函数
    this.type = null;
    //实际的div
    this.stateNode = null;

    //Fiber 这里存放着相关的节点
    this.return = null;
    this.child = null;
    this.sibling = null;
    this.index = 0;

    this.ref = null;

    //工作单元
    //本次旋绕需要的props
    this.pendingProps = pendingProps;
    //上次渲染所需的props
    this.memoizedProps = null;

    //副作用
    this.flag = NoFlags;
  }
}
