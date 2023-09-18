import React from 'react';

import { UseBoundStore, useStore } from "zustand";
import { StoreApi } from "zustand/vanilla";

type ExtractState<S> = S extends {
  getState: () => infer T;
} ? T : never;
type ReadonlyStoreApi<T> = Pick<StoreApi<T>, 'getState' | 'subscribe'>;
type WithReact<S extends ReadonlyStoreApi<unknown>> = S & {
  getServerState?: () => ExtractState<S>;
};

type Selector<S, P = unknown, U = unknown> =
  [(store: S, props: P) => U, (a: U, b: U) => boolean]
  | ((store: S, props: P) => U);

export type ConnectProps<T> = T & {
  values: any[]
}


export type ConnectPropsWithStore<T, S> = ConnectProps<T> & {
  store: UseBoundStore<WithReact<ReadonlyStoreApi<S>>> | StoreApi<S>;
}

function useStoreWrapper<S>(store: StoreApi<S>) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return ((selector, equals) => useStore(store, selector, equals)) as UseBoundStore<WithReact<ReadonlyStoreApi<S>>>;
}

export function connect<S, P = unknown, U = unknown>(Component: React.FC<ConnectProps<P>>, store: UseBoundStore<WithReact<ReadonlyStoreApi<S>>> | StoreApi<S>, selectors: Selector<S, P, U>[]) {
  const Wrapper: React.FC<P> = (props) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const storeFn = typeof store === 'function' ? store : useStoreWrapper<S>(store);
    const values = [] as unknown[];

    for (const selector of selectors) {
      if (Array.isArray(selector)) {
        values.push(storeFn(state => selector[0](state, props), selector[1]));
        continue;
      }
      values.push(storeFn((state) => selector(state, props)));
    }

    return (
      <Component {...props} values={values}></Component>
    );
  };

  Wrapper.displayName = `${Component.name}.ConnectWrapper`;
  return Wrapper as React.FC<Omit<P, 'values'>>;
}

export function connectUsingProps<S, P = unknown>(Component: React.FC<ConnectPropsWithStore<P, S>>, selectors: Selector<S, P>[]) {
  function Wrapper(props: ConnectPropsWithStore<P, S>) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const storeFn = typeof props.store === 'function' ? props.store : useStoreWrapper<S>(props.store);
    const values = [] as unknown[];

    for (const selector of selectors) {
      if (Array.isArray(selector)) {
        values.push(storeFn(state => selector[0](state, props), selector[1]));
        continue;
      }
      values.push(storeFn((state) => selector(state, props)));
    }

    return (
      <Component {...props} values={values}></Component>
    );
  }

  Wrapper.displayName = `${Component.name}.ConnectUsingPropsWrapper`;
  return Wrapper as React.FC<Omit<ConnectPropsWithStore<P, S>, 'values'>>;
}