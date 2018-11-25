import { TOOLBOX_COLORS } from '../../Constants.js';

const Accel = {
    init: function() {
        this.appendDummyInput()
            .appendField('Acceleration')
            .appendField(
                new Blockly.FieldDropdown([
                    [
                        {
                            src:
                                'components/blockly-extensions/blocks/Acceleration/images/board_horizontal.png',
                            width: 20,
                            height: 20
                        },
                        'horizontal'
                    ],
                    [
                        {
                            src:
                                'components/blockly-extensions/blocks/Acceleration/images/board_vertical.png',
                            width: 20,
                            height: 20
                        },
                        'vertical'
                    ]
                ]),
                'orientation'
            );
        this.setOutput(true, 'Number');
        this.setColour(TOOLBOX_COLORS.INPUT);
    },
    python: block => {
        const orientation = block.getFieldValue('orientation');
        return [`accel_${orientation}()`, 1];
    }
};

Blockly.Blocks.Accel = Accel;
Blockly.Python.Accel = Accel.python;
