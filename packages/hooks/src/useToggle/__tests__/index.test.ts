import { renderHook, act, RenderHookResult } from '@testing-library/react';
import useToggle, { Actions } from '../index';

// act 调用hooks返回的方法
const callToggle = (hook: any) => {
  act(() => {
    hook.result.current[1].toggle();
  });
};

describe('useToggle', () => {
  it('测试初始值', async () => {
    const hook = renderHook(() => useToggle());
    // 判断初始值是否是false
    expect(hook.result.current[0]).toBeFalsy();
    // console.log('hooks', hook.result.current[0]);
  });

  it('执行actions', async () => {
    const hook = renderHook(() => useToggle('hello'));
    // 判断state是否为hello
    expect(hook.result.current[0]).toBe('hello');
    callToggle(hook);
    // 判断当前state是否为false
    expect(hook.result.current[0]).toBeFalsy();
    act(() => {
      hook.result.current[1].setLeft();
    });
    expect(hook.result.current[0]).toBe('hello');
    act(() => {
      hook.result.current[1].setRight();
    });
    expect(hook.result.current[0]).toBeFalsy();
  });

  it('执行两个params', () => {
    const hook = renderHook(() => useToggle('hello', 'world'));
    callToggle(hook);
    expect(hook.result.current[0]).toBe('world');

    act(() => {
      hook.result.current[1].setLeft();
    });
    expect(hook.result.current[0]).toBe('hello');
    act(() => {
      hook.result.current[1].setRight();
    });
    expect(hook.result.current[0]).toBe('world');
  });
});
