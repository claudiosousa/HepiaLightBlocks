import { COLORS } from '../Constants.js'

const AllumerLed = {
    init: function () {
        this.appendDummyInput()
            .appendField('allumer LED');
        this.appendValueInput('y')
            .setCheck("Number")
            .appendField('ligne');
        this.appendValueInput('x')
            .setCheck("Number")
            .appendField('colonne');
        this.appendDummyInput()
            .appendField('couleur')
            .appendField(new Blockly.FieldColour(COLORS[0]), 'color');
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(0);
        this.setTooltip('Allumer LED');
        this.setHelpUrl('');
    },
    python: block => {
        const converRgbToNumber = rgb => parseInt(rgb.substr(1), 16);

        const y = Blockly.Python.valueToCode(block, 'y', 1);
        const x = Blockly.Python.valueToCode(block, 'x', 2);
        const color = block.getFieldValue('color');
        return `allumer_led(${x}, ${y}, ${converRgbToNumber(color)})\n`;
    }
};


Blockly.Blocks.AllumerLed = AllumerLed;
Blockly.Python.AllumerLed = AllumerLed.python;
