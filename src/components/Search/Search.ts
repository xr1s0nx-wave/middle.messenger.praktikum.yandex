import Block from '@/core/Block';
import template from './Search.hbs?raw';

export class Search extends Block {
    constructor(props: Record<string, any> = {}) {
        super('form', {
            ...props,
            className: 'search',
        });
    }

    render(): DocumentFragment {
        return this.compile(template, this._meta.props);
    }
}