import { TOOLBOX_COLORS } from '../Constants.js';

const ScrollText = {
    init: function() {
        this.appendDummyInput()
            .appendField('Afficher ')
            .appendField(new Blockly.FieldTextInput('Salut!'), 'text');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(TOOLBOX_COLORS.DISPLAY);
    },
    python: block => {
        const text = block.getFieldValue('text');

        return `afficher_texte('${text}')`;
    }
};

Blockly.Blocks.ScrollText = ScrollText;
Blockly.Python.ScrollText = ScrollText.python;
