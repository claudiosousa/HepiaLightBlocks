import BlocklyController from './blockly/BlocklyController.js';
import blocklyConfig from './blockly/BlocklyConfig.js';

const blocklyCtrl = new BlocklyController(blocklyContainer, blocklyConfig);


blocklyCtrl.blockly.addChangeListener(() => {
    codeOutput.innerHTML = PR.prettyPrintOne(Blockly.Python.workspaceToCode(blocklyCtrl.blockly), 'py');
});
