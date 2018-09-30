import { default as LEDImage } from './custom-field.js';

const COLUMNS = 10, LINES = 10;

const custom_blocks = {

    led_image: {
        init: function () {
            this.appendDummyInput()
                .appendField('Image LED');
            this.appendDummyInput()
                .appendField(new LEDImage(), 'image');
            this.setInputsInline(false);
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(207);
            this.setTooltip('Image LED');
            this.setHelpUrl('');
        },
        python: block => {
            const image = block.getFieldValue('image');
            return `led_image('${image}')`;
        }
    },

    eteindre_led: {
        init: function () {
            this.appendDummyInput()
                .appendField('eteindre LED');
            this.appendDummyInput()
                .appendField('ligne')
                .appendField(new Blockly.FieldNumber(0, 0, LINES - 1), 'x');
            this.appendDummyInput()
                .appendField('colonne')
                .appendField(new Blockly.FieldNumber(0, 0, COLUMNS - 1), 'y');
            this.setInputsInline(true);
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(0);
            this.setTooltip('Eteindre LED');
            this.setHelpUrl('');
        },
        python: block => {
            const x = block.getFieldValue('x');
            const y = block.getFieldValue('y');
            return `allumer_led(${x}, ${y}, 0)\n`;
        }
    },

    allumer_led: {
        init: function () {
            this.appendDummyInput()
                .appendField('allumer LED');
            this.appendDummyInput()
                .appendField('ligne')
                .appendField(new Blockly.FieldNumber(0, 0, LINES - 1), 'x');
            this.appendDummyInput()
                .appendField('colonne')
                .appendField(new Blockly.FieldNumber(0, 0, COLUMNS - 1), 'y');
            this.appendDummyInput()
                .appendField('couleur')
                .appendField(new Blockly.FieldColour('#ff0000'), 'color');
            this.setInputsInline(true);
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(0);
            this.setTooltip('Allumer LED');
            this.setHelpUrl('');
        },
        python: block => {
            const converRgbToNumber = rgb => parseInt(rgb.substr(1), 16);

            const x = block.getFieldValue('x');
            const y = block.getFieldValue('y');
            const color = block.getFieldValue('color');
            return `allumer_led(${x}, ${y}, ${converRgbToNumber(color)})\n`;
        }
    },

    attendre_s: {
        init: function () {
            this.appendDummyInput()
                .appendField('attendre')
                .appendField(new Blockly.FieldNumber(1, 0, Infinity), 's')
                .appendField('s');
            this.setInputsInline(true);
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(0);
            this.setTooltip('Attendre des secondes');
            this.setHelpUrl('');
        },
        python: block => {
            const s = block.getFieldValue('s');
            return `delai(${s})\n`;
        }
    },

    attendre_ms: {
        init: function () {
            this.appendDummyInput()
                .appendField('attendre')
                .appendField(new Blockly.FieldNumber(100, 0, Infinity), 'ms')
                .appendField('ms');
            this.setInputsInline(true);
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(0);
            this.setTooltip('Attendre des milli-secondes');
            this.setHelpUrl('');
        },
        python: block => {
            const s = block.getFieldValue('ms');
            return `delai(${s / 1000})\n`;
        }
    }
};

for (let k in _.forOwn(custom_blocks)) {
    Blockly.Blocks[k] = custom_blocks[k];
    Blockly.Python[k] = custom_blocks[k].python;
}


export default custom_blocks;