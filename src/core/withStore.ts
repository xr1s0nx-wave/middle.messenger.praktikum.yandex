import Store from "./Store";
import Block from "./Block";

function withStore<T extends Record<string, unknown>, P extends Record<string, unknown>>(
  Component: typeof Block,
  store: Store<T>,
  mapStateToProps: (state: T) => Partial<P>
) {
  return class extends Component {
    constructor(tagName?: string, propsAndChildren: P = {} as P) {
      const mappedProps = mapStateToProps(store.getState());
      super(tagName, { ...propsAndChildren, ...mappedProps });
      store.subscribe((...args: unknown[]) => {
        const state = args[0] as T;
        this.setProps(mapStateToProps(state));
      });
    }
  };
}

export default withStore;
