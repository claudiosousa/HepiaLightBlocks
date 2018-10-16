const PourToujours = {
    init: function() {
        this.appendDummyInput().appendField('Pour toujours');
        this.appendStatementInput('instructions').setCheck(null);
        this.setColour(120);
    },
    python: block => {
        let branch = Blockly.Python.statementToCode(block, 'instructions');
        branch =
            Blockly.Python.addLoopTrap(branch, block.id) || Blockly.Python.PASS;
        return `while True:\n${branch}`;
    }
};

Blockly.Blocks.PourToujours = PourToujours;
Blockly.Python.PourToujours = PourToujours.python;
