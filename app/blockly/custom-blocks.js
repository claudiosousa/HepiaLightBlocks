const custom_blocks = {

    allumer_led: {
        init: function () {
            this.appendDummyInput()
                .appendField("allumer LED");
            this.appendDummyInput()
                .appendField("ligne")
                .appendField(new Blockly.FieldNumber(0, 0, 9), "x");
            this.appendDummyInput()
                .appendField("colonne")
                .appendField(new Blockly.FieldNumber(0, 0, 9), "y");
            this.appendDummyInput()
                .appendField("couleur")
                .appendField(new Blockly.FieldColour("#ff0000"), "color");
            this.setInputsInline(true);
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(0);
            this.setTooltip("Allumer LED");
            this.setHelpUrl("");
        }
    }
};

for (let k in _.forOwn(custom_blocks)) {
    Blockly.Blocks[k] = custom_blocks[k];
}

const converRgbToNumber = rgb => parseInt(rgb.substr(1), 16);

Blockly.Python['allumer_led'] = block => {
    const x = block.getFieldValue('x');
    const y = block.getFieldValue('y');
    const color = block.getFieldValue('color');
    return `allumer_led(${x}, ${y}, ${converRgbToNumber(color)})\n`;
};