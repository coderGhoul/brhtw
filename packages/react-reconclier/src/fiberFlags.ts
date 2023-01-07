// flag 标记 我们 将reactElment 和 filberNode进行比较 产生不同的标记
// 就比方说vue种的__skip__这种标记

/**
 * 这里哦我们猜一下为什么要使用这种二进制数据表示flag副作用
 * 我感觉是因为可以快速运行 | &  ～这种位运算操作 这种位运算操作可以快速的添加副作用
 * 其实react在后面种也有这位运算符的应用到时候在说。
 *
 * 当然这种东西也有弊端，首先在JavaScript种浮点数 是基于IEEE754的标准生成的，当然不是完全基于
 * 相当于IEEE754子集中的子集64位浮点数类型，但是进行位操作时，采用32位有符号整型，这意味着其转换的结果也是32位有符号整型。在进行位运算的时候会拿出一位作为符号位
 * （这里感兴趣可以看IEEE文档或者看JavaScript悟道的前几章写的很深入）
 *  * **/
// 下面我们注释几种简单的
export type Flags = number;
//下面两个运用于 React Dev Tools，不能更改他们的值
// 没有工作
export const NoFlags = /*                */ 0b00000000000000000000000000;
//正在工作
export const PerformedWork = /*                */ 0b00000000000000000000000001;

// 下面的 flags 用于标记副作用
export const Placement = /*                    */ 0b00000000000000000000000010;
//2 移动，插入
export const Update = /*                       */ 0b00000000000000000000000100;
export const ChildDeletion = /*                */ 0b00000000000000000000001000;
export const ContentReset = /*                 */ 0b00000000000000000000010000;
export const Callback = /*                     */ 0b00000000000000000000100000;
export const DidCapture = /*                   */ 0b00000000000000000001000000;
export const ForceClientRender = /*            */ 0b00000000000000000010000000;
export const Ref = /*                          */ 0b00000000000000000100000000;
export const Snapshot = /*                     */ 0b00000000000000001000000000;
export const Passive = /*                      */ 0b00000000000000010000000000;
export const Hydrating = /*                    */ 0b00000000000000100000000000;
export const Visibility = /*                   */ 0b00000000000001000000000000;
export const StoreConsistency = /*             */ 0b00000000000010000000000000;
