import Store from "@/core/Store";
import Block from "@/core/Block";
import withStore from "@/core/withStore";

// 1. Создаём стор
const initialState = { count: 0 };
const store = new Store(initialState);

// 2. Обычный компонент Block
class Counter extends Block {
  constructor(tagName?: string, props?: { count: number }) {
    super(tagName ?? "div", props ?? { count: 0 });
  }
  render(): DocumentFragment {
    const fragment = document.createDocumentFragment();
    const span = document.createElement("span");
    span.textContent = `Count: ${this._meta.props.count}`;
    fragment.appendChild(span);
    return fragment;
  }
}

// 3. HOC-компонент, автоматически подписан на Store
const CounterWithStore = withStore(
  Counter,
  store,
  (state) => ({ count: state.count })
);

// 4. Использование
const counter = new CounterWithStore();
document.body.appendChild(counter.getContent());

// 5. Изменение состояния
setInterval(() => {
  store.setState({ count: store.getState().count + 1 });
}, 1000);
