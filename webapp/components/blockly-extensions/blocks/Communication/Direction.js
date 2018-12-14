import { TOOLBOX_COLORS } from '../../Constants.js';

const Direction = {
    init: function() {
        this.appendDummyInput().appendField(
            new Blockly.FieldDropdown([
                ['Nord', 'N'],
                ['Ouest', 'O'],
                ['Sud', 'S'],
                ['Est', 'E']
            ]),
            'direction'
        );

        this.setOutput(true, 'DIRECTION');
        this.setColour(TOOLBOX_COLORS.COMMUNICATION);
        this.setTooltip('');
        this.setHelpUrl('');
    },
    python: block => [block.getFieldValue('direction'), 1]
};

Blockly.Blocks.Direction = Direction;
Blockly.Python.Direction = Direction.python;
