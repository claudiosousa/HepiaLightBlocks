import { TOOLBOX_COLORS } from '../../Constants.js';

const OPERATIONS = {
    pair: x => `${x} % 2 == 0`,
    impair: x => `${x} % 2 == 1`,
    entier: x => `${x} % 1 == 0`,
    positif: x => `${x} > 0`,
    négatif: x => `${x} < 0`
};

const MathNumeroProprietes = {
    init: function() {
        this.appendValueInput('value').setCheck('Number');
        this.appendDummyInput().appendField(
            new Blockly.FieldDropdown([..._.map(OPERATIONS, (_, k) => [k, k])]),
            'function'
        );
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

Blockly.Blocks.MathNumeroProprietes = MathNumeroProprietes;
Blockly.Python.MathNumeroProprietes = MathNumeroProprietes.python;
