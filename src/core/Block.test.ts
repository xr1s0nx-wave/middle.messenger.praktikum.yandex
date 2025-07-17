import { expect } from 'chai';
import Block from './Block';
describe('Block', () => {
  it('должен создавать DOM-элемент с правильным тегом', () => {
    const block = new Block('span');
    expect(block.getContent().tagName).to.equal('SPAN');
  });
  it('должен проксировать props и вызывать обновление', () => {
    const block = new Block('div', { foo: 'bar' });
    (block as any)._eventBus.emit = function(event: string) {
      if (event === Block.EVENTS.RENDER) {
        this.rendered = true;
      }
    };
    block.setProps({ foo: 'baz' });
    expect((block as any)._meta.props.foo).to.equal('baz');
  });
  it('метод compile возвращает DocumentFragment', () => {
    class TestBlock extends Block {
      public testCompile(template: string, props: Record<string, unknown>) {
        return this.compile(template, props);
      }
    }
    const block = new TestBlock('div');
    const fragment = block.testCompile('<div>{{foo}}</div>', { foo: 'bar' });
    expect(fragment).to.be.instanceOf(DocumentFragment);
  });
}); 
