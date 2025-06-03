import Block from '@/core/Block';
import template from './Search.hbs?raw';

export class Search extends Block {
    constructor(props: Record<string, any> = {}) {
        super('div', {
            ...props,
            className: 'search',
        });
    }

    componentDidMount() {
        const input = this.getContent().querySelector('.search__input') as HTMLInputElement;
        if (input) {
            input.oninput = (e: Event) => {
                console.log('asd')
                const value = (e.target as HTMLInputElement).value;
                const onInput = this._meta.props.onInput;
                if (typeof onInput === 'function') {
                    onInput(value);
                }
            };
        }
    }

    render(): DocumentFragment {
        console.log(this._meta.props);
        return this.compile(template, this._meta.props);
    }
}