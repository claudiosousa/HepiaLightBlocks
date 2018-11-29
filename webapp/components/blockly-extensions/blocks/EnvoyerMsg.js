import { TOOLBOX_COLORS } from '../Constants.js';

const EnvoyerMsg = {
    init: function() {
        this.appendDummyInput()
            .appendField('Envoyer')
            .appendField('message')
            .appendField(new Blockly.FieldNumber(0), 'msg')
            .appendField('direction')
            .appendField(
                new Blockly.FieldDropdown([
                    ['Nord', 'N'],
                    ['Ouest', 'O'],
                    ['Sud', 'S'],
                    ['Est', 'E']
                ]),
                'direction'
            );

        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(TOOLBOX_COLORS.INPUT);
        this.setTooltip('');
        this.setHelpUrl('');
    },
    python: block => {
        const direction = block.getFieldValue('direction');
        const msg = block.getFieldValue('msg');
        return `envoyer_msg(${direction}, ${msg})\n`;
    }
};

Blockly.Blocks.EnvoyerMsg = EnvoyerMsg;
Blockly.Python.EnvoyerMsg = EnvoyerMsg.python;
