const supportSymbol = typeof Symbol === 'function' && Symbol.for;

//这个包用来添加新符号

//这里为什么使用Symbol 可能是为了生成一个独一无二的Symobl对象，这样能有效的防止XSS这种注入的攻击
export const REACT_ELEMENT_TYPE = supportSymbol ? Symbol.for('react.element') : 0xabcd;
