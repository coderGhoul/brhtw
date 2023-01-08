import { Action } from 'shared/ReactTypes';
export type Update<State> = {
  action: Action<State>;
};

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
function enUpdateQueue<State>(updateQueue: UpdateQueue<State>, update: Update<State>) {
  updateQueue.shared.pending = update;
}

//消费update大胆方法
const processUpdateQueue = <State>(
  baseState: State,
  pendingUpdate: Update<State> | null,
): { memoizedState: State } => {
  const result: ReturnType<typeof processUpdateQueue<State>> = {
    memoizedState: baseState,
  };

  if (pendingUpdate !== null) {
    const action = pendingUpdate.action;
    if (action instanceof Function) {
      result.memoizedState = action(baseState);
    } else {
      result.memoizedState = action;
    }
  }
  return result;
};
