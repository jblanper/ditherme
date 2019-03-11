import Sketch from './sketch.js';
import { options } from './conf.js';

function main () {
    const sketch = new Sketch(options.sketch);
    sketch.init().then(msg => console.log(msg)).catch(errorMsg => console.log(errorMsg));
};

main();
