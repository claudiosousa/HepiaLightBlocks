import BlocklyController from './blockly/BlocklyController.js';
import blocklyConfig from './blockly/BlocklyConfig.js';
import PythonWidget from './python/PythonWidget.js';

const blocklyContainer = document.getElementById('blocklyContainer');
const blocklyCtrl = new BlocklyController(blocklyContainer, blocklyConfig);

const codeOutput = document.getElementById('codeOutput');
const pythonWidget = new PythonWidget(codeOutput, blocklyCtrl);

