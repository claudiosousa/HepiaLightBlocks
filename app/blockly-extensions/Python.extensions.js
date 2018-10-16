const finishFn = Blockly.Python.finish;

Blockly.Python.finish = code => {
    if (Blockly.Python.definitions_) {
        delete Blockly.Python.definitions_['from_numbers_import_Number'];
        delete Blockly.Python.definitions_['variables'];
    }

    return finishFn(code);
};

Blockly.Python.math_change = block => {
    const argument0 =
        Blockly.Python.valueToCode(
            block,
            'DELTA',
            Blockly.Python.ORDER_ADDITIVE
        ) || '0';
    const varName = Blockly.Python.variableDB_.getName(
        block.getFieldValue('VAR'),
        Blockly.Variables.NAME_TYPE
    );
    return `${varName} = ${varName} + ${argument0}\n`;
};
