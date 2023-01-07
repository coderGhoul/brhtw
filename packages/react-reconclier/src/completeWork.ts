import { FiberNode } from './fiberNode';
//归阶段

export const completeWork = (fiber: FiberNode): any => {
  console.log(`${fiber.key} start`);
};
