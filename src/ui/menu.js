import Description from './description.js';
import Select from './select.js';
import FileButton from './fileButton.js';
import DownloadButton from './downloadButton.js';
import Slider from './slider.js';
import ToggleButton from './toggleButton.js';
import Section from './section.js';
import { html, svg } from './html.js';

export default class Menu {
    constructor ({event, showOnLoad = true}) {
        this.showOnLoad = showOnLoad;
        this.event = event;

        this.componentTypes = {
            description: Description, select: Select,
            toggleButton: ToggleButton, slider: Slider,
            fileButton: FileButton, downloadButton: DownloadButton,
            section: Section
        };

        this.node = null;
        this.menuBtn = null;
        this.closeBtn = null;

        this.reset();

        this.render();
        this.eventListener();
    }

    reset () {
        const previousMenu = document.querySelector('#ui');
        const menuBtn = document.querySelector('#menu');

        if (previousMenu) previousMenu.parentNode.removeChild(previousMenu);
        if (menuBtn) menuBtn.parentNode.removeChild(menuBtn);
    }

    createComponent(type, options = null) {
        if (!options.parent) {
            options = Object.assign({}, {parent: this}, options);
        }

        const component = new this.componentTypes[type](options);

        return component;
    }

    render () {
        this.menuBtn = svg('svg', {width: 45, height: 45, id: 'menu'}, [
            svg('rect', {x: 10, y: 10, width: 25, height: 5, fill: '#000'}),
            svg('rect', {x: 10, y: 20, width: 25, height: 5, fill: '#000'}),
            svg('rect', {x: 10, y: 30, width: 25, height: 5, fill: '#000'})
        ]);

        this.closeBtn = html('button', {textContent: '[ close ]', id: 'close'}, null);
        this.node = html('div', {id: 'ui'}, [this.closeBtn])

        if (!this.showOnLoad) this.node.classList.add('moverIzq');

        document.body.appendChild(this.menuBtn);
        document.body.appendChild(this.node);
    }

    addSeparator () {
        const hr = document.createElement('hr');
        this.node.appendChild(hr);
    }

    eventListener () {
        this.menuBtn.addEventListener('click', this.openEventHandler.bind(this));
        this.closeBtn.addEventListener('click', this.closeEventHandler.bind(this));
    }

    openEventHandler (e) {
        this.node.classList.remove('moverIzq');
    }

    closeEventHandler (e) {
        this.node.classList.add('moverIzq');
    }

    addSignature () {
        const sign = svg('svg', {
            width: 50, height: 50, viewBox: '0 0 13.229166 13.229167' 
        }, [
            svg('rect', {
                y: '-7.7716e-16', width: '13.229', height: '13.229',
                fill: '#aaa', style: 'paint-order:normal'
            }, null),
            svg('g', {fill: '#fff'}, [
                svg('path', {d: 'm5.7496 1.641v6.8601c0 0.75774-0.61427 1.372-1.372 1.372-0.63771 0-1.174-0.43495-1.3278-1.0245l-1.2898 1.2898c0.54581 0.87079 1.514 1.4497 2.6176 1.4497 1.7049 0 3.087-1.3821 3.087-3.0871v-6.8601z'}, null),
                svg('path', {d: 'm8.3907 5.4141v6.1741c1.701-5e-3 3.0785-1.385 3.0785-3.0871 0-1.7021-1.3775-3.0824-3.0785-3.087z'}, null),
                svg('path', {d: 'm8.3907 1.641v3.43c0.94414-4e-3 1.7084-0.77004 1.7084-1.715s-0.76428-1.7115-1.7084-1.715z'}, null)
            ])
        ]);

        const link = html('a', {
            href: 'https://github.com/jblanper', target: '_blank', id: 'signature'
        }, [html('span', {textContent: 'by'}), sign]);

        this.node.appendChild(link);
    }

}
