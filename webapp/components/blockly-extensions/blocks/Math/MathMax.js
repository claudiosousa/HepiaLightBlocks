import { TOOLBOX_COLORS } from '../../Constants.js';

const MathMax = {
    init: function() {
        this.appendDummyInput().appendField(
            new Blockly.FieldDropdown([['Maximum', 'max'], ['Minimum', 'min']]),
            'function'
        );
        this.appendValueInput('value').setCheck('nb1');
        this.appendValueInput('value').setCheck('nb2');

        this.setInputsInline(true);
        this.setOutput(true, 'Number');
        this.setColour(TOOLBOX_COLORS.MATH);
    },
    python: block => {
        const fn = block.getFieldValue('function');
        const nb1 = Blockly.Python.valueToCode(block, 'nb1', 2);
        const nb2 = Blockly.Python.valueToCode(block, 'nb2', 2);
        return [`${fn}(${nb1}, ${nb2})`, 1];
    }
};

Blockly.Blocks.MathMax = MathMax;
Blockly.Python.MathMax = MathMax.python;
