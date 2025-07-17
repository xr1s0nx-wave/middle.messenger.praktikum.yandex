import { expect } from 'chai';
import Router from './Router';
import Block from '../core/Block';
describe('Router', () => {
  class DummyBlock extends Block {
    render() {
      const fragment = document.createDocumentFragment();
      const div = document.createElement('div');
      div.textContent = 'dummy';
      fragment.appendChild(div);
      return fragment;
    }
  }
  let router: Router;
  beforeEach(() => {
    document.body.innerHTML = '<div id="app"></div>';
    router = new Router('#app');
  });
  it('добавляет маршрут через use', () => {
    router.use('/test', DummyBlock);
    expect(router.getRoute('/test')).to.not.be.undefined;
  });
  it('go меняет текущий маршрут', () => {
    router.use('/test', DummyBlock);
    router.go('/test');
    expect(router.getRoute('/test')).to.not.be.undefined;
  });
}); 