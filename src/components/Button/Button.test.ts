import { expect } from 'chai';
import Button from './Button';
describe('Button', () => {
  it('рендерит текст кнопки', () => {
    const btn = new Button({ text: 'Click me' });
    const content = btn.getContent();
    expect(content.textContent).to.include('Click me');
  });
  it('устанавливает правильный type', () => {
    const btn = new Button({ type: 'submit' });
    const content = btn.getContent();
    expect(content.getAttribute('type')).to.equal('submit');
  });
}); 