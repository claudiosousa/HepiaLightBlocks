import { TOOLBOX_COLORS } from '../../Constants.js';

const CONSTANTS = {
    π: Math.PI,
    e: Math.E,
    φ: (1 + Math.sqrt(5)) / 2,
    'sqrt(2)': Math.SQRT2,
    'sqrt(½)': Math.SQRT1_2,
    '∞': "float('inf')"
};

const MathConstants = {
    init: function() {
        this.appendDummyInput().appendField(
            new Blockly.FieldDropdown([..._.map(CONSTANTS, (v, k) => [k, k])]),
            'constant'
        );
        this.setOutput(true, 'Number');
        this.setColour(TOOLBOX_COLORS.MATH);
    },
    python: block => {
        const constant = block.getFieldValue('constant');
        return [`${CONSTANTS[constant]}`, 1];
    }
};

Blockly.Blocks.MathConstants = MathConstants;
Blockly.Python.MathConstants = MathConstants.python;
