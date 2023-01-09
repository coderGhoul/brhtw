/**
 * 简单介绍一下update 和 upadteQueue
 *
 * 主要的作用就是用来记录 更新 组件的状态变化
 * 然后将多个状态的变化存入updateQueue当中
 * 然后最后在消费update
 *
 *
 * 在这里我们说明  组件其实分为两种组件：一种称之为有状态的组件、一种是无状态的组件
 * 当有状态组件发生改变时会生成一个update => 然后为了批量更新=> 压入updaed队列里面（可以理解成并行计算）
 *
 * 这里我们先提一下react 中 会有两种组件现在 一种是类组件 （class） 一种是函数式组件（FC）
 * 我们先说类组件，类组件修改 state的状态的方式有两种：
 * 一种是 setState("2") :类似于这种式一个具体的变量
 *第二种就是：使用setState（x=> x + 1）在setState中传入一个匿名函数
 *
 * **/

import { Action } from 'shared/ReactTypes';
export type Update<State> = {
  action: Action<State>;
};

//这里我们目前很精简的只声明了shared这一个属性，这个属性就是真正存放了update的地方
export type UpdateQueue<State> = {
  shared: {
    pending: Update<State> | null;
  };
};

export function CreateUpdate<State>(action: Action<State>) {
  return {
    action,
  };
}

export function createUpdateQueue() {
  return {
    shared: {
      pending: null,
    },
  };
}

//将update 添加至 updateQueue队列中
export function enUpdateQueue<State>(updateQueue: UpdateQueue<State>, update: Update<State>) {
  updateQueue.shared.pending = update;
}

//消费update的方法
export const processUpdateQueue = <State>(
  baseState: State,
  pendingUpdate: Update<State> | null,
): { memoizedState: State } => {
  const result: ReturnType<typeof processUpdateQueue<State>> = {
    memoizedState: baseState,
  };
  //这里的逻辑比较简单，就是和判断 更新的这个单元是否为空
  if (pendingUpdate !== null) {
    const action = pendingUpdate.action;
    //不为空，如果是函数就执行函数 ，如果是不是直接赋值
    if (action instanceof Function) {
      result.memoizedState = action(baseState);
    } else {
      result.memoizedState = action;
    }
  }
  //
  return result;
};
