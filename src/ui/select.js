import { html } from './html.js';

export default class Select {
    constructor ({parent, prop, label, options, value}) {
        this.prop = prop;

        this.label = label;
        this.options = options;
        this.value = value;

        this.parent = parent;
        this.node = null;
        this.input = null;

        this.render();
        this.eventListener();
    }

    render () {
        const options = this.options.map(opt =>
            html('option', {value: opt, textContent: opt,
                selected: opt === this.value
            })
        );

        this.input = html('select', {id: this.prop}, options);

        this.node = html('div', {classes: ['select']}, [
            html('label', {textContent: this.label, for: this.prop}, null),
            html('br'), this.input
        ]);

        this.parent.node.appendChild(this.node);
    }

    eventListener () {
        this.input.addEventListener('change', this.eventHandler.bind(this));
    }

    eventHandler (e) {
        this.value = this.input.value
        this.parent.event.emit(this.prop, {prop: this.prop, value: this.value});
    }
}
