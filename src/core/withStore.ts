import Store from "./Store";
import Block from "./Block";

function withStore<T extends Record<string, any>, P extends Record<string, any>>(
  Component: typeof Block,
  store: Store<T>,
  mapStateToProps: (state: T) => Partial<P>
) {
  return class extends Component {
    private unsubscribe: (() => void) | null = null;

    constructor(tagName?: string, propsAndChildren: P = {} as P) {
      const mappedProps = mapStateToProps(store.getState());
      super(tagName, { ...propsAndChildren, ...mappedProps });
      this.unsubscribe = store.subscribe((state) => {
        this.setProps(mapStateToProps(state));
      });
    }
  };
}

export default withStore;
