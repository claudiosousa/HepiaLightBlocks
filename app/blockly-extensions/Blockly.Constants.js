import { TOOLBOX_COLORS } from './Constants.js';

Blockly.Msg = {
    ...Blockly.Msg,
    LOOPS_HUE: TOOLBOX_COLORS.LOOPS,
    LOGIC_HUE: TOOLBOX_COLORS.LOGIC,
    VARIABLES_HUE: TOOLBOX_COLORS.VARIABLES,
    MATH_HUE: TOOLBOX_COLORS.MATH
};

Blockly.Scrollbar.scrollbarThickness = 11;
