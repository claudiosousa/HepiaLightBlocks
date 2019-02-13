import { TOOLBOX_COLORS } from '../Constants.js';

const AttendreMs = {
    init: function() {
        this.appendDummyInput()
            .appendField('Attendre')
            .appendField(new Blockly.FieldNumber(100, 0, Infinity), 'ms')
            .appendField('ms');
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(TOOLBOX_COLORS.DELAY);
        this.setTooltip('Attendre des milli-secondes');
        this.setHelpUrl('');
    },
    python: block => {
        const s = block.getFieldValue('ms');
        return `delai(${s / 1000})\n`;
    }
};

Blockly.Blocks.AttendreMs = AttendreMs;
Blockly.Python.AttendreMs = AttendreMs.python;
