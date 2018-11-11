import { COLORS, TOOLBOX_COLORS } from '../Constants.js';

const AllumerTout = {
    init: function() {
        this.appendDummyInput().appendField('Allumer tout');
        this.appendDummyInput().appendField(
            new Blockly.FieldColour(COLORS[0]),
            'color'
        );
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(TOOLBOX_COLORS.DISPLAY);
        this.setTooltip('');
        this.setHelpUrl('');
    },
    python: block => {
        const converRgbToNumber = rgb => parseInt(rgb.substr(1), 16);

        const color = block.getFieldValue('color');
        return `allumer_tout(${converRgbToNumber(color)})\n`;
    }
};

Blockly.Blocks.AllumerTout = AllumerTout;
Blockly.Python.AllumerTout = AllumerTout.python;
