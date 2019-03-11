import { html } from './html.js';

export default class ToggleButton {
    constructor ({parent, prop, value, label}) {
        this.prop = prop;

        this.label = label;
        this.value = value;

        this.node = null;
        this.parent = parent;

        this.render();
        this.eventListener();
    }

    render () {
        this.node = html('button', {
            textContent: this.label, id: this.prop, classes: ['toggle']
        }, null);

        if (!this.value) this.node.classList.add('deactivated');

        this.parent.node.appendChild(this.node);
    }

    eventListener () {
        this.node.addEventListener('click', this.eventHandler.bind(this));
    }

    eventHandler (e) {
        this.node.classList.toggle('deactivated');
        this.value = !this.value

        this.parent.event.emit(this.prop, {prop: this.prop, value: this.value});
    }
}
