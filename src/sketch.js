import Event from './event.js';
import createUi from './ui.js';
import CachedImage from './image.js';
import ImageQuantizer from './imageQuantizer.js';

export default class Sketch {
    constructor (options) {
        this.drawingCtx = document.querySelector('#sketch').getContext('2d');
        this.drawingType = options.drawingType;

        this.imageOptions = options.image;
        this.quantizeOptions = options.quantize;
    }

    init ({imageUrl = this.imageOptions.url} = {}) {
        this.event = new Event();

        this.cachedImg = new CachedImage({
            event: this.event,
            url: imageUrl,
            width: this.imageOptions.width,
            blackAndWhite: this.imageOptions.blackAndWhite,
            drawingCtx: this.drawingCtx
        });

        return this.cachedImg.init()
        .then(msg => {
            console.log(msg);

            // image processing
            this.imageQuantizer = new ImageQuantizer({
                cachedImg: this.cachedImg,
                drawingCtx: this.drawingCtx,
                quantizeStep: this.quantizeOptions.quantizeStep,
                withDithering: this.quantizeOptions.withDithering,
                event: this.event
            });

            // initial draw
            this.event.emit('drawingType', {
                prop: 'drawingType', value: this.drawingType
            });

            // subscriptions
            this.event.on('imageUrl', data => this.init(data.value));
            this.event.on('png', this.setPng.bind(this));

            //ui
            createUi(this.event, { 
                drawingType: this.drawingType,
                image: {
                    blackAndWhite: this.imageOptions.blackAndWhite,
                    width: this.cachedImg.width,
                    maxWidth: this.cachedImg.maxWidth
                },
                quantize: this.quantizeOptions
            });

            return 'Sketch initialized';
        });
    }

    setPng () {
        const cachedCanvasCtx = Object.assign(
            document.createElement('canvas'),
            {width: this.drawingCtx.canvas.width, height: this.drawingCtx.canvas.height}
        ).getContext('2d');

        cachedCanvasCtx.drawImage(this.drawingCtx.canvas, 0, 0);

        const data = cachedCanvasCtx.canvas.toDataURL('image/png');

        const win = window.open();
        win.document.write(`<img src="${data}" />`);
    }
}
