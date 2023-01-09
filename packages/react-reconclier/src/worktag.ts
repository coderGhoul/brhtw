// 这里我们直接从官网拿过来所有的 worktag,在下面注释种我们注释几个常用的注释

export type WorkTag =
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23
  | 24
  | 25
  | 26
  | 27;
// 函数组件
export const FunctionComponent = 0;
// 类组件
export const ClassComponent = 1;
// 不知道他是 函数组件还是类组件之前
export const IndeterminateComponent = 2; // Before we know whether it is function or class
//根节点
export const HostRoot = 3; // Root of a host tree. Could be nested inside another node.
//	ReactDOM.createPortal 产生的 Portal
export const HostPortal = 4; // A subtree. Could be an entry point to a different renderer.
// dom元素
export const HostComponent = 5;
// 文本元素
export const HostText = 6;
//	<React.Fragment>）
export const Fragment = 7;
//	<React.StrictMode>
export const Mode = 8;
// 	<Context.Consumer>
export const ContextConsumer = 9;
// 	<Context.Provider>
export const ContextProvider = 10;
//	React.ForwardRef
export const ForwardRef = 11; 
export const Profiler = 12;
export const SuspenseComponent = 13;
export const MemoComponent = 14;
export const SimpleMemoComponent = 15;
export const LazyComponent = 16;
export const IncompleteClassComponent = 17;
export const DehydratedFragment = 18;
export const SuspenseListComponent = 19;
export const ScopeComponent = 21;
export const OffscreenComponent = 22;
export const LegacyHiddenComponent = 23;
export const CacheComponent = 24;
export const TracingMarkerComponent = 25;
export const HostResource = 26;
export const HostSingleton = 27;
