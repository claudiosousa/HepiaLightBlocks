export default class BlocklyController {
    constructor(domContainer, config) {

        this.blockly = Blockly.inject(domContainer, config);

        const resize = () => Blockly.svgResize(this.blockly);
        window.addEventListener('resize', resize, false);
        resize();
    }
}