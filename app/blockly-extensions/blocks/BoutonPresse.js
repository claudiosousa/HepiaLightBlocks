const BouttonPresse = {
    init: function() {
        this.appendDummyInput()
            .appendField('Bouton pressé')
            .appendField(
                new Blockly.FieldDropdown([
                    [
                        {
                            src: './images/board_button1.png',
                            width: 15,
                            height: 15
                        },
                        'haut_gauche'
                    ],
                    [
                        {
                            src: './images/board_button2.png',
                            width: 15,
                            height: 15
                        },
                        'haut_droite'
                    ],
                    [
                        {
                            src: './images/board_button3.png',
                            width: 15,
                            height: 15
                        },
                        'bas_gauche'
                    ],
                    [
                        {
                            src: './images/board_button4.png',
                            width: 15,
                            height: 15
                        },
                        'bas_droite'
                    ]
                ]),
                'button_position'
            );
        this.setOutput(true, 'Boolean');
        this.setColour(45);
    },
    python: block => {
        const button = block.getFieldValue('button_position');
        return [`touche_${button}()`, 1];
    }
};

Blockly.Blocks.BouttonPresse = BouttonPresse;
Blockly.Python.BouttonPresse = BouttonPresse.python;
