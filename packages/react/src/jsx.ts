import { ELementType, Key } from 'shared/ReactTypes';
import { REACT_ELEMENT_TYPE } from '../../shared/ReactSymbol';
import { Ref, Props, REACT_ELEMENT, Type } from '../../shared/ReactTypes';
import hasOwnProperty from 'shared/hasOwnProperty';
//创建ReactElement

/**
 *@param type
 #@param ref
 #@param props
 @param key
 * **/
const ReactElement = function (type: Type, key: Key, ref: Ref, props: Props) {
  //创建一个对象
  const Element: REACT_ELEMENT = {
    //这个字段说明 element是reactElement，相当于打了一个标记，然后在扫描到这个标记的时候，就会判断出来这是一个reactElement
    $$typeof: REACT_ELEMENT_TYPE,
    key,
    ref,
    type,
    props,
  };

  return Element;
};

/**
 *在编译时应该是会运行对应的插件 比如我们使用rollup 就可以使用rollup-jsx-plugin
 *在运行时 就要实现jsx方法
 * **/
// <div id="coderghoul" key="[独一无二的值]" ref ="ele" > i am a div Element</div>
/**
 * config: id="coderghoul"
 * **/
export function jsx(type: ELementType, config: any) {
  let key = null;
  const props: Props = {};
  const ref: Ref = null;

  /*在源码中这个地方是区分了 开发环境和生产环境
   *在生产环境中是将key 和 ref
   *存放在了maybekey判断 hasValidRef 和 hasValidKey 使用 hasOwnproperty.call('config','key'/'ref')来判断
   ** 然后遍历config 拿到 config 的属性 赋值给props 并且做一些额外的检查
   * 这里我们为了简单只写了生产环境的代码可以一起放在config当中一起被收集
   */

  for (const prop in config) {
    if (prop === 'key' && config[prop] !== undefined) {
      key = '' + key;
    }
    if (prop === 'ref' && config[prop] !== undefined) {
      key = '' + config[prop];
    }
    if (hasOwnProperty.call(config, props)) {
      props[prop] = config[prop];
    }
  }
  //返回一个ReactELement
  return ReactElement(type, key, ref, props);
}

export const jsxDev = (type: ELementType, config: any) => {
  let key = null;
  const props: Props = {};
  const ref: Ref = null;

  /*在源码中这个地方是区分了 开发环境和生产环境
   *在生产环境中是将key 和 ref
   *存放在了maybekey判断 hasValidRef 和 hasValidKey 使用 hasOwnproperty.call('config','key'/'ref')来判断
   ** 然后遍历config 拿到 config 的属性 赋值给props 并且做一些额外的检查
   * 这里我们为了简单只写了生产环境的代码可以一起放在config当中一起被收集
   */

  for (const prop in config) {
    if (prop === 'key' && config[prop] !== undefined) {
      key = '' + key;
    }
    if (prop === 'ref' && config[prop] !== undefined) {
      key = '' + config[prop];
    }
    if (hasOwnProperty.call(config, props)) {
      props[prop] = config[prop];
    }
  }
  //返回一个ReactELement
  return ReactElement(type, key, ref, props);
};
