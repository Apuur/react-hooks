import { useMemo, useState } from 'react';

export interface Actions<T> {
  // 确定 往哪边切换
  set: (value: T) => void;
  // 切换
  toggle: () => void;
  // 切换到左侧
  setLeft: () => void;
  // 切换到右侧
  setRight: () => void;
}

// 函数的重载声明
// 1. boolean   通过boolean类型做切换
function useToggle<T = boolean>(): [boolean, Actions<T>];
// 2. 给一个默认值
function useToggle<T>(defaultValue: T): [T, Actions<T>];

function useToggle<T, U>(defaultValue: T, reverseValue: U): [T | U, Actions<T | U>];

function useToggle<D, R>(defaultValue: D = false as unknown as D, reverseValue?: R) {
  const [state, setState] = useState<D | R>(defaultValue);
  const reverseValueOrigin = (reverseValue ?? !defaultValue) as D | R;

  const actions = useMemo(() => {
    const setLeft = () => setState(defaultValue);
    const setRight = () => setState(reverseValueOrigin);
    const toggle = () => setState((s) => (s === defaultValue ? reverseValueOrigin : defaultValue));
    const set = (value: D | R) => setState(value);
    return {
      set,
      toggle,
      setLeft,
      setRight,
    };
  }, []);

  return [state, actions];
}

export default useToggle;
