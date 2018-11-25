import { TOOLBOX_COLORS } from '../../Constants.js';

const Penche = {
    init: function() {
        this.appendDummyInput()
            .appendField('Penché')
            .appendField(
                new Blockly.FieldDropdown([
                    [
                        {
                            src:
                                'components/blockly-extensions/blocks/Penche/images/board_top.png',
                            width: 20,
                            height: 20
                        },
                        'avant'
                    ],
                    [
                        {
                            src:
                                'components/blockly-extensions/blocks/Penche/images/board_right.png',
                            width: 20,
                            height: 20
                        },
                        'droite'
                    ],
                    [
                        {
                            src:
                                'components/blockly-extensions/blocks/Penche/images/board_bottom.png',
                            width: 20,
                            height: 20
                        },
                        'arriere'
                    ],
                    [
                        {
                            src:
                                'components/blockly-extensions/blocks/Penche/images/board_left.png',
                            width: 20,
                            height: 20
                        },
                        'gauche'
                    ]
                ]),
                'penche_position'
            );
        this.setOutput(true, 'Boolean');
        this.setColour(TOOLBOX_COLORS.INPUT);
    },
    python: block => {
        const button = block.getFieldValue('penche_position');
        return [`penche_${button}()`, 1];
    }
};

Blockly.Blocks.Penche = Penche;
Blockly.Python.Penche = Penche.python;
