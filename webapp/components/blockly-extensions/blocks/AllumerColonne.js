import { COLORS, TOOLBOX_COLORS } from '../Constants.js';

const AllumerColonne = {
    init: function() {
        this.appendDummyInput().appendField('Allumer colonne');
        this.appendValueInput('number').setCheck('Number');
        this.appendDummyInput()
            .appendField('couleur')
            .appendField(new Blockly.FieldColour(COLORS[0]), 'color');
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(TOOLBOX_COLORS.DISPLAY);
        this.setTooltip('');
        this.setHelpUrl('');
    },
    python: block => {
        const converRgbToNumber = rgb => parseInt(rgb.substr(1), 16);

        const number = Blockly.Python.valueToCode(block, 'number', 1);
        const color = block.getFieldValue('color');
        return `allumer_colonne(${number}, ${converRgbToNumber(color)})\n`;
    }
};

Blockly.Blocks.AllumerColonne = AllumerColonne;
Blockly.Python.AllumerColonne = AllumerColonne.python;
