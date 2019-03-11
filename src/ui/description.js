import { html } from './html.js';

export default class Description {
    constructor ({parent, title, content}) {
        this.title = title;
        this.content = content;

        this.node = null;
        this.parent = parent;

        this.render();
    }

    render () {
        this.node = html('div', {id: 'description'}, [
            html('h1', {textContent: this.title}, null)
        ]);

        this.content.forEach(text => {
            const p = html('p', {textContent: text}, null);
            this.node.appendChild(p);
        });

        this.parent.node.appendChild(this.node);
    }
}
