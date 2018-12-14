import { TOOLBOX_COLORS } from '../../Constants.js';

const EnvoyerMsg = {
    init: function() {
        this.appendDummyInput()
            .appendField('Envoyer')
            .appendField(new Blockly.FieldNumber(1, 1), 'msg')
            .appendField('en direction');

        this.appendValueInput('direction').setCheck('DIRECTION');

        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(TOOLBOX_COLORS.COMMUNICATION);
        this.setTooltip('');
        this.setHelpUrl('');
    },
    python: block => {
        const direction = Blockly.Python.valueToCode(block, 'direction', 1);

        const msg = block.getFieldValue('msg');
        return `envoyer_msg(${direction}, ${msg})\n`;
    }
};

Blockly.Blocks.EnvoyerMsg = EnvoyerMsg;
Blockly.Python.EnvoyerMsg = EnvoyerMsg.python;
