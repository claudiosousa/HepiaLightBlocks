import { COLORS } from '../Constants.js'
import LEDImageField from '../fields/LedImageField.js';

const LedImage = {
    init : function () {
        const fieldColor = new Blockly.FieldColour(COLORS[0]);
        fieldColor.setColours(COLORS);
        this.appendDummyInput()
            .appendField('Image LED');
        this.appendDummyInput()
            .appendField('couleur')
            .appendField(fieldColor, 'color');
        this.appendDummyInput()
            .appendField(new LEDImageField(), 'image');
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(207);
        this.setTooltip('Image LED');
        this.setHelpUrl('');
    },
    python: block => {
        const image = block.getFieldValue('image');
        let image_str = '"""'
        for (let i = 0; i < 10; i++) {
            image_str += "\n    ";
            for (let j = 0; j < 10; j++)
                image_str += image[i * 10 + j];
        }
        image_str += '\n"""';
        return `afficher_grille(${image_str})\n`;
    }
};


Blockly.Blocks.LedImage = LedImage;
Blockly.Python.LedImage = LedImage.python;
