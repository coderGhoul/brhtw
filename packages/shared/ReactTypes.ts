export type Type = any;
export type Key = any;
export type Props = any;
export type Ref = any;
export type ELementType = any;

export interface REACT_ELEMENT {
  $$typeof: symbol | number;
  type: Type;
  key: Key;
  props: Props;
  ref: Ref;
}
