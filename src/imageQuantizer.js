import Color from './color.js';

export default class ImageQuantizer {
    constructor ({
        event, cachedImg, drawingCtx,
        quantizeStep = 3,
        withDithering = true
    }) {
        // quantize options
        this.withDithering = withDithering;
        this.quantizeStep = quantizeStep;

        // data
        this.cachedImg = cachedImg;
        this.imgData = null; // contain pixels

        // for rendering
        this.drawingCtx = drawingCtx;

        // subscriptions
        this.event = event;
        this.event.on('withDithering', this.update.bind(this));
        this.event.on('quantizeStep', this.update.bind(this));
        this.event.on('drawingType', data => {
            if (data.value === 'quantize') this.draw();
        });
        this.event.on('cachedImage-update', this.process.bind(this));

        // initial setup
        this.process();
    }

    // getters
    get width () { return this.cachedImg.ctx.canvas.width; }

    get height () { return this.cachedImg.ctx.canvas.height; }

    // methods
    process () {
        this.imgData = this.cachedImg.ctx.getImageData(
            0, 0, this.width, this.height
        );

        for (let i = 0; i < this.imgData.data.length; i += 4) {
            
            const r = this.quantize(this.imgData.data[i]);
            const g = this.quantize(this.imgData.data[i + 1]);
            const b = this.quantize(this.imgData.data[i + 2]);

            if (this.withDithering) {
                this.fsDithering(r, g, b, i);
            }

            this.imgData.data[i] = r;
            this.imgData.data[i + 1] = g,
            this.imgData.data[i + 2] = b;
        }
    }

    quantize (value) {
        return Math.round((value * this.quantizeStep) / 255) *
            Math.floor(255 / this.quantizeStep);
    }

    fsDithering (r, g, b, i) {
        // Floyd-Steinberg dithering
        // https://en.wikipedia.org/wiki/Floyd%E2%80%93Steinberg_dithering
        const quantError = {
            r: this.imgData.data[i] - r,
            g: this.imgData.data[i + 1] - g,
            b: this.imgData.data[i + 2] - b
        };
        
        // right
        this.fsDitheringColorOperation({
            index: i + 4, numerator: 7, denominator: 16, quantError: quantError
        });
        // down left
        this.fsDitheringColorOperation({
            index: i + (this.width * 4) - 4, numerator: 3, denominator: 16,
            quantError: quantError
        });
        // down
        this.fsDitheringColorOperation({
            index: i + (this.width * 4), numerator: 5, denominator: 16,
            quantError: quantError
        });
        // down right
        this.fsDitheringColorOperation({
            index: i + (this.width * 4) + 4, numerator: 1, denominator: 16,
            quantError: quantError
        });
    }
    
    fsDitheringColorOperation ({index, numerator, denominator, quantError}) {
        this.imgData.data[index] = Math.round(
            this.imgData.data[index] + (quantError.r * (numerator / denominator))
        );
        this.imgData.data[index + 1] = Math.round(
            this.imgData.data[index + 1] + (quantError.g * (numerator / denominator))
        );
        this.imgData.data[index + 2] = Math.round(
            this.imgData.data[index + 2] + (quantError.b * (numerator / denominator))
        );
    }

    changeCanvasSize () {
        if ((this.drawingCtx.canvas.width !== this.width) ||
            (this.drawingCtx.canvas.height !== this.height)) {
            this.drawingCtx.canvas.width = this.width;
            this.drawingCtx.canvas.height = this.height;
        }
    }

    draw () {
        this.changeCanvasSize();

        this.drawingCtx.putImageData(this.imgData, 0, 0);
    }

    update (data) {
        this[data.prop] = data.value;

        this.process();
        this.draw();
    }
}
