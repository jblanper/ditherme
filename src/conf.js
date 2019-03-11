export const options = {
    sketch: {
        drawingType: 'image',// 'image' o 'quantize'
        image: {
            url: './photo.jpg',
            width: null,
            blackAndWhite: false
        },
        quantize: {
            quantizeStep: 1,
            withDithering: false
        }
    }
}
