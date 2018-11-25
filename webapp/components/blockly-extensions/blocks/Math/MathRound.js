import { TOOLBOX_COLORS } from '../../Constants.js';

const MathRound = {
    init: function() {
        this.appendDummyInput().appendField(
            new Blockly.FieldDropdown([
                ['arrondir', 'round'],
                ['arrondir par excès', 'ceil'],
                ['arrondir par défaut', 'floor']
            ]),
            'function'
        );
        this.appendValueInput('value').setCheck('Number');

        this.setOutput(true, 'Number');
        this.setColour(TOOLBOX_COLORS.MATH);
    },
    python: block => {
        const fn = block.getFieldValue('function');
        const value = Blockly.Python.valueToCode(block, 'value', 2);
        return [`${fn}(${value})`, 1];
    }
};

Blockly.Blocks.MathRound = MathRound;
Blockly.Python.MathRound = MathRound.python;
