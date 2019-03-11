import { html } from './html.js';

export default class FileButton {
    constructor ({parent, label, prop = undefined, type = 'image'}) {
        this.prop = prop;

        this.type = type;
        this.label = label;

        this.parent = parent;
        this.node = null;
        this.input = null;

        this.render();
        this.eventListener();
    }

    render () {
        this.input = html('input', {type: 'file', id: this.prop}, null);
        this.node = html('label',
            {textContent: this.label, classes: ['file-btn']},
            [this.input]
        );

        this.parent.node.appendChild(this.node);
    }

    eventListener () {
        this.input.addEventListener('change', this.eventHandler.bind(this));
    }

    eventHandler (e) {
        const reader = new FileReader();

        reader.onload = file => {
            // either url or not yet parsed json
            const result = (this.type === 'json')
                ? JSON.parse(file.target.result)
                : file.target.result;

            const options = (this.prop) ? {[this.prop]: result} : result;

            this.parent.event.emit(this.prop, {prop: this.prop, value: options});
        }

        if (this.type === 'image') reader.readAsDataURL(e.target.files[0]);
        if (this.type === 'json') reader.readAsText(e.target.files[0]);
    }
}
