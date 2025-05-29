import Block from '@/core/Block';
import template from './ChatItem.hbs?raw';

export class Search extends Block {
    render() {
        return this.compile(template, {});
    }
}