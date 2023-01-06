const supportSymbol = typeof Symbol === 'function' && Symbol.for;

//这个包用来添加新符号

export const REACT_ELEMENT_TYPE = supportSymbol ? Symbol.for('react.element') : 0xabcd;
