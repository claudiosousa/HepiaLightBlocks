import { TOOLBOX_COLORS } from '../Constants.js';

const EteindreTout = {
    init: function() {
        this.appendDummyInput().appendField('Éteindre tout');
        this.setInputsInline(true);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(TOOLBOX_COLORS.DISPLAY);
        this.setTooltip('');
        this.setHelpUrl('');
    },
    python: block => {
        return 'eteindre_tout()\n';
    }
};

Blockly.Blocks.EteindreTout = EteindreTout;
Blockly.Python.EteindreTout = EteindreTout.python;
