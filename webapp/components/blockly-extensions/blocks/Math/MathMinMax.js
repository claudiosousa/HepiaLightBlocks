import { TOOLBOX_COLORS } from '../../Constants.js';

const MathMinMax = {
    init: function() {
        this.appendDummyInput()
            .appendField('Limiter entre')
            .appendField(new Blockly.FieldNumber(0), 'min')
            .appendField('et')
            .appendField(new Blockly.FieldNumber(9), 'max');

        this.appendValueInput('value').setCheck('Number');

        this.setInputsInline(true);
        this.setOutput(true, 'Number');
        this.setColour(TOOLBOX_COLORS.MATH);
    },
    python: block => {
        const min = block.getFieldValue('min');
        const max = block.getFieldValue('max');
        const value = Blockly.Python.valueToCode(block, 'value', 2);
        return [`min(${max}, max(${min}, ${value}))`, 1];
    }
};

Blockly.Blocks.MathMinMax = MathMinMax;
Blockly.Python.MathMinMax = MathMinMax.python;
