
declare module '@project/types' {
  import { FunctionComponent, PropsWithChildren, ElementType } from "react";

  export type CompositeComponent<C, P = unknown> = React.FC<PropsWithChildren<P>> & {
    [K in keyof C]: C[K]
  }
}

