import { TOOLBOX_COLORS } from '../Constants.js';

const RecevoirMsg = {
    init: function() {
        this.appendDummyInput()
            .appendField('Recevoir de')
            .appendField(
                new Blockly.FieldDropdown([
                    ['Nord', 'N'],
                    ['Ouest', 'O'],
                    ['Sud', 'S'],
                    ['Est', 'E']
                ]),
                'direction'
            );

        this.setColour(TOOLBOX_COLORS.INPUT);
        this.setOutput(true, 'Number');

        this.setTooltip('');
        this.setHelpUrl('');
    },
    python: block => {
        const direction = block.getFieldValue('direction');
        return [`recevoir_msg(${direction})\n`, 1];
    }
};

Blockly.Blocks.RecevoirMsg = RecevoirMsg;
Blockly.Python.RecevoirMsg = RecevoirMsg.python;
