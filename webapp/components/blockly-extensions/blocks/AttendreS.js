import { TOOLBOX_COLORS } from '../Constants.js';

const AttendreS = {
    init: function() {
        this.appendDummyInput()
            .appendField('Attendre')
            .appendField(new Blockly.FieldNumber(1, 0, Infinity), 's')
            .appendField('s');
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(TOOLBOX_COLORS.DELAY);
        this.setTooltip('Attendre des secondes');
        this.setHelpUrl('');
    },
    python: block => {
        const s = block.getFieldValue('s');
        return `delai(${s})\n`;
    }
};

Blockly.Blocks.AttendreS = AttendreS;
Blockly.Python.AttendreS = AttendreS.python;
