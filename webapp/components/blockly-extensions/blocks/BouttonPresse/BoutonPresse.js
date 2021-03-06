import { TOOLBOX_COLORS } from '../../Constants.js';

const BouttonPresse = {
    init: function() {
        this.appendDummyInput()
            .appendField('Bouton pressé')
            .appendField(
                new Blockly.FieldDropdown([
                    [
                        {
                            src:
                                'components/blockly-extensions/blocks/BouttonPresse/images/board_button1.png',
                            width: 20,
                            height: 20
                        },
                        'haut_gauche'
                    ],
                    [
                        {
                            src:
                                'components/blockly-extensions/blocks/BouttonPresse/images/board_button2.png',
                            width: 20,
                            height: 20
                        },
                        'haut_droite'
                    ],
                    [
                        {
                            src:
                                'components/blockly-extensions/blocks/BouttonPresse/images/board_button3.png',
                            width: 20,
                            height: 20
                        },
                        'bas_gauche'
                    ],
                    [
                        {
                            src:
                                'components/blockly-extensions/blocks/BouttonPresse/images/board_button4.png',
                            width: 20,
                            height: 20
                        },
                        'bas_droite'
                    ]
                ]),
                'button_position'
            );
        this.setOutput(true, 'Boolean');
        this.setColour(TOOLBOX_COLORS.INPUT);
    },
    python: block => {
        const button = block.getFieldValue('button_position');
        return [`touche_${button}()`, 1];
    }
};

Blockly.Blocks.BouttonPresse = BouttonPresse;
Blockly.Python.BouttonPresse = BouttonPresse.python;
