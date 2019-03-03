import { TOOLBOX_COLORS } from '../Constants.js';

const EteindreLed = {
    init: function() {
        this.appendDummyInput().appendField('Éteindre LED');
        this.appendValueInput('y')
            .setCheck('Number')
            .appendField('ligne');
        this.appendValueInput('x')
            .setCheck('Number')
            .appendField('colonne');
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(TOOLBOX_COLORS.DISPLAY);
        this.setTooltip('Éteindre LED');
        this.setHelpUrl('');
    },
    python: block => {
        const y = Blockly.Python.valueToCode(block, 'y', 1);
        const x = Blockly.Python.valueToCode(block, 'x', 2);

        return `eteindre_led(${x}, ${y})\n`;
    }
};

Blockly.Blocks.EteindreLed = EteindreLed;
Blockly.Python.EteindreLed = EteindreLed.python;
