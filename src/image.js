export default class CachedImage {
    constructor ({event, url, drawingCtx, width = null, blackAndWhite = false}) {
        this.url = url;
        this.width = width;
        this.height = undefined;
        this.maxWidth = undefined;
        this.maxHeight = undefined;

        this.drawingCtx = drawingCtx;
        this.bwCtx = document.createElement('canvas').getContext('2d');
        this.colorCtx = document.createElement('canvas').getContext('2d');

        this.blackAndWhite = blackAndWhite;

        this.img;

        // subscriptions
        this.event = event;
        this.event.on('blackAndWhite', this.update.bind(this));
        this.event.on('width', this.update.bind(this));
        this.event.on('drawingType', data => {
            if (data.value === 'image') this.draw();
        });
    }

    init () {
        return this.setImg()
        .then(msg => {
            console.log(msg)

            this.setCachedImg();
            
            return 'Created cached image and got its data';
        }).catch(errorMsg => console.log(errorMsg));
    }

    get ctx () {
        return (this.blackAndWhite) ? this.bwCtx : this.colorCtx;
    }

    setImg () {
        return new Promise((resolve, reject) => {
            this.img = new Image();
            this.img.src = this.url;

            this.img.onload = _ => resolve(`"${this.img.src}" loaded`);
            this.img.onerror = _ => reject(`Error loading "${this.img.src}"`);
        });
    }

    setCachedImg () {
        this.setImgSize();

        this.colorCtx.canvas.width = this.width;
        this.colorCtx.canvas.height = this.height;
        this.bwCtx.canvas.width = this.width;
        this.bwCtx.canvas.height = this.height;

        this.colorCtx.drawImage(this.img, 0, 0, this.width, this.height);
        this.bwCtx.putImageData(this.getBwImageData(), 0, 0);
    }

    setImgSize () {
        const imgRatio = this.img.height / this.img.width;
        const browserRatio = window.innerHeight / window.innerWidth;

        this.maxWidth = (browserRatio < imgRatio)
            ? window.innerHeight / imgRatio
            : window.innerWidth;

        this.maxHeight = (browserRatio < imgRatio)
            ? window.innerHeight
            : window.innerWidth * imgRatio;

        if (this.width && (
            (this.width <= window.innerWidth) &&
            (this.width * imgRatio <= window.innerHeight)
        )) {
            this.height = this.width * imgRatio;
            return;
        } else {
            this.width = this.maxWidth;
            this.height = this.maxHeight;
        }
    }

    getBwImageData () {
        const imgData = this.colorCtx.getImageData(
            0, 0, this.width, this.height
        );

        for (let i = 0; i < imgData.data.length; i += 4) {
            const bwValue = imgData.data[i] * .2126 +
                imgData.data[i + 1] * .7152 +
                imgData.data[i + 2] * .0722;

            imgData.data[i] = bwValue;
            imgData.data[i + 1] = bwValue;
            imgData.data[i + 2] = bwValue;
        }

        return imgData;
    }

    draw () {
        this.drawingCtx.canvas.width = this.width;
        this.drawingCtx.canvas.height = this.height;

        this.drawingCtx.drawImage(this.ctx.canvas, 0, 0, this.width, this.height);
    }

    update (data) {
        this[data.prop] = data.value;

        if (this.width !== this.colorCtx.canvas.width) {
            this.setCachedImg();
        }

        this.draw();

        this.event.emit('cachedImage-update');
    }
}
