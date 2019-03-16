import Description from './description.js';
import Select from './select.js';
import FileButton from './fileButton.js';
import DownloadButton from './downloadButton.js';
import Slider from './slider.js';
import ToggleButton from './toggleButton.js';
import Section from './section.js';
import { html, svg } from './html.js';

export default class Menu {
    constructor ({event, showOnLoad = true, githubUrl}) {
        this.showOnLoad = showOnLoad;
        this.event = event;
        this.githubUrl = githubUrl;

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
            svg('g', {fill: '#800000'}, [
                svg('path', {
                    d: "m6.6152 0.023438c-3.6369 0-6.5918 2.9548-6.5918 6.5918 0 3.6369 2.9548 6.5898 6.5918 6.5898 3.6369 0 6.5898-2.9529 6.5898-6.5898 0-3.6369-2.9529-6.5918-6.5898-6.5918zm0 0.50781c3.363 0 6.084 2.721 6.084 6.084s-2.721 6.084-6.084 6.084-6.084-2.721-6.084-6.084 2.721-6.084 6.084-6.084z",
                    color: "#000000", 
                    style: "font-feature-settings:normal;font-variant-alternates:normal;font-variant-caps:normal;font-variant-ligatures:normal;font-variant-numeric:normal;font-variant-position:normal;isolation:auto;mix-blend-mode:normal;paint-order:normal;shape-padding:0;text-decoration-color:#000000;text-decoration-line:none;text-decoration-style:solid;text-indent:0;text-orientation:mixed;text-transform:none;white-space:normal"
                }, null),
                svg('g', {transform: "translate(-.19844 .19844)"}, [
                    svg('path', {
                        d: "m8.1166 5.4546v5.6823c1.5655-0.0045 2.8332-1.2747 2.8332-2.8411 0-1.5665-1.2678-2.8369-2.8332-2.8411z"
                    }, null),
                    svg('path', {
                        d: "m8.1204 1.6954v3.2544c0.89579-0.00377 1.6209-0.7306 1.6209-1.6272 0-0.89658-0.72514-1.6238-1.6209-1.6272z"
                    }, null),
                    svg('path', {
                        d: "m5.8204 1.6958v6.996a0.81365 0.81365 0 0 1 -0.8137 0.8137 0.81365 0.81365 0 0 1 -0.8137 -0.8137l-1.5168 0.72437a2.4409 2.4409 0 0 0 2.3305 1.7167 2.4409 2.4409 0 0 0 2.4411 -2.4411v-6.996z"
                    }, null),
                ])
            ])
        ]);

        const link = html('a', {
            href: '//joseblancoperales.com', target: '_blank', id: 'signature'
        }, [html('span', {textContent: 'by'}), sign]);

        const githubLink = html('a', {
            href: this.githubUrl, target: '_blank',
            id: 'github-link', textContent: 'github'
        }, null);

        this.node.appendChild(link);
        this.node.appendChild(githubLink);
    }

}
