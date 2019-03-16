import Menu from './ui/menu.js';

export default function createUi (event, options) {
    const menu = new Menu({
        event: event, showOnLoad: true,
        githubUrl: '//github.com/jblanper/getapalette'
    });

    menu.createComponent('description', {
        title: 'Dither me!',
        content: [
            'Small web app for applying color quantization and dithering to any image. It can also turn any picture black and white and change its size. Please use the button below to upload an image.',
            'Enjoy!'
        ]
    });

    menu.addSeparator();

    const drawingTypeSelect = menu.createComponent('select', {
        prop: 'drawingType' ,
        label: 'draw options',
        options: ['image', 'quantize'],
        value: options.drawingType
    });

    menu.addSeparator();

    // sections //
    const drawingTypeSection = menu.createComponent('section', {
        select: drawingTypeSelect,
        emptyMessage: 'No options for this section'
    });

    /// section image ///
    const blackAndWhiteBtn = menu.createComponent('toggleButton', {
        parent: drawingTypeSection,
        label: 'toggle b&w',
        prop: 'blackAndWhite',
        value: options.image.blackAndWhite
    });

    const imageSizeSlider = menu.createComponent('slider', {
        parent: drawingTypeSection,
        max: options.image.maxWidth,
        min: 100,
        prop: 'width',
        label: 'image size in px',
        value: options.image.width
    });

    drawingTypeSection.createGroup({
        name: 'image',
        nodes: [blackAndWhiteBtn, imageSizeSlider]
    });

    /// section quantize ///
    const withDitheringBtn = menu.createComponent('toggleButton', {
        parent: drawingTypeSection,
        label: 'toggle dithering',
        prop: 'withDithering',
        value: options.quantize.withDithering
    });

    const quantizeStepSlider = menu.createComponent('slider', {
        parent: drawingTypeSection,
        label: 'quantize step',
        max: 8,
        min: 1,
        prop: 'quantizeStep',
        value: options.quantize.quantizeStep
    });

    drawingTypeSection.createGroup({
        name: 'quantize',
        nodes: [
            withDitheringBtn,
            quantizeStepSlider
        ]
    });

    // end of section container //

    menu.addSeparator();

    menu.createComponent('fileButton', {
        prop: 'imageUrl',
        label: 'upload IMG'
    });

    menu.createComponent('downloadButton', {
        label: 'download IMG',
        prop: 'png' 
    });

    menu.addSignature();

    return menu
}
