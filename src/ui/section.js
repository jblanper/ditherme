import { html } from './html.js';

export default class Section {
    constructor ({parent, select, emptyMessage = 'No options'}) {
        this.emptyMessage = emptyMessage;

        this.select = select.input;
        this.selectValue = this.select.value;

        this.parent = parent;
        this.event = this.parent.event; 
        this.node = null;

        this.groups = {};

        this.render();
        this.eventListener();
    }

    createGroup ({name, nodes}) {
        const group = html('div', {id: `section-${name}`}, nodes.map(elem => elem.node));

        this.groups[name] = group;
        this.render();
    }

    render () {
        if (!this.groups[this.selectValue]) {
            this.groups[this.selectValue] = html('div', 
                {classes: ['section-empty']},
                [html('p', {textContent: this.emptyMessage})]
            );
        }            

        if (this.node) {
            this.node.replaceChild(
                this.groups[this.selectValue],
                this.node.firstElementChild
            );
        }
        else {
            this.node = html('div',
                {classes: ['section-container']},
                [this.groups[this.selectValue]]
            );
            this.parent.node.appendChild(this.node);
        }
    }

    eventListener () {
        this.select.addEventListener('change', this.eventHandler.bind(this));
    }

    eventHandler (e) {
        this.selectValue = this.select.value;
        this.render();
    }
}
