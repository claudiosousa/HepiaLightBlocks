import { TOOLBOX_COLORS } from '../../Constants.js';

const RecevoirMsg = {
    init: function() {
        this.appendDummyInput().appendField('Recevoir de');

        this.appendValueInput('direction').setCheck('DIRECTION');

        this.setColour(TOOLBOX_COLORS.COMMUNICATION);
        this.setOutput(true, 'Number');
        this.setInputsInline(true);
        this.setTooltip('');
        this.setHelpUrl('');
    },
    python: block => {
        const direction = Blockly.Python.valueToCode(block, 'direction', 1);
        return [`recevoir_msg(${direction})\n`, 1];
    }
};

Blockly.Blocks.RecevoirMsg = RecevoirMsg;
Blockly.Python.RecevoirMsg = RecevoirMsg.python;
