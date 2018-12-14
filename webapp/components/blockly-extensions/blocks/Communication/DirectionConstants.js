import { TOOLBOX_COLORS } from '../../Constants.js';

const DIRECTIONS = [['Nord', 'N'], ['Ouest', 'O'], ['Sud', 'S'], ['Est', 'E']];

DIRECTIONS.map(([label, direction]) => ({
    label,
    init: function() {
        this.appendDummyInput().appendField(label);

        this.setOutput(true, 'DIRECTION');
        this.setColour(TOOLBOX_COLORS.COMMUNICATION);
        this.setTooltip('');
        this.setHelpUrl('');
    },
    python: () => [direction, 1]
})).forEach(component => {
    Blockly.Blocks[component.label] = component;
    Blockly.Python[component.label] = component.python;
});
