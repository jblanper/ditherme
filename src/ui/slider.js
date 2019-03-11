import { html } from './html.js';

export default class Slider {
    constructor ({parent, max, min, step = 1, value, prop, label}) {
        this.prop = prop;

        this.label = label;
        this.max = max, this.min = min, this.step = step;
        this.value = value;

        this.parent = parent;
        this.node = null;
        this.input = null;
        this.output = null;

        this.render();
        this.eventListener();
    }

    render () {
        this.input = html('input', {
            type: 'range', id: this.prop, max: this.max,
            min: this.min, step: this.step, value: this.value
        });

        this.output = html('output', {textContent: this.value});

        this.node = html('div', {classes: ['slider']}, [
            html('label', {for: this.prop, textContent: `${this.label} \u2014 `}),
            this.output, html('br'), this.input
        ]);

        this.parent.node.appendChild(this.node);
    }

    eventListener () {
        this.input.addEventListener('change', this.eventHandler.bind(this));
    }

    eventHandler (e) {
        const value = this.input.valueAsNumber;
        this.output.textContent = value;

        this.parent.event.emit(this.prop, {prop: this.prop, value: value});
    }
}
