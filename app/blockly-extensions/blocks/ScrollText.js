/*
 ###  14
####  30
##### 31
#   # 17
*/


const textDict = {
    'A': [14, 17, 17, 17, 31, 17, 17],
    'B': [30, 17, 17, 30, 17, 17, 30]
}

const ScrollText = {
    init: function () {
        this.appendDummyInput()
            .appendField('Afficher ')
            .appendField(new Blockly.FieldTextInput('Salut!'), 'text');
        this.setColour(230);
    },
    python: block => {
        const text = block.getFieldValue('text');

        return `affiche_texte('${text}')`;
    }
}


Blockly.Blocks.ScrollText = ScrollText;
Blockly.Python.ScrollText = ScrollText.python;
