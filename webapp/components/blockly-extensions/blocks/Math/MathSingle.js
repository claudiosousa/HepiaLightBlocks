import { TOOLBOX_COLORS } from '../../Constants.js';

const OPERATIONS = {
    'racine carrée': x => `${x}**(1/2)`,
    'valeur absolute': x => `abs(${x})`,
    '-': x => `-${x}`,
    'e^': x => `${Math.E}**${x}`,
    '10^': x => `${10}**${x}`
};

const MathSingle = {
    init: function() {
        this.appendDummyInput().appendField(
            new Blockly.FieldDropdown([..._.map(OPERATIONS, (_, k) => [k, k])]),
            'function'
        );
        this.appendValueInput('value').setCheck('Number');

        this.setInputsInline(true);
        this.setOutput(true, 'Number');
        this.setColour(TOOLBOX_COLORS.MATH);
    },
    python: block => {
        const fn = block.getFieldValue('function');
        const value = Blockly.Python.valueToCode(block, 'value', 2);
        return [OPERATIONS[fn](value), 1];
    }
};

Blockly.Blocks.MathSingle = MathSingle;
Blockly.Python.MathSingle = MathSingle.python;
