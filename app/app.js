import BlocklyController from './blockly/index.js';
import PythonWidget from './python/Widget.js';

const blocklyCtrl = new BlocklyController($('#blocklyContainer')[0]);

const pythonWidget = new PythonWidget($('#codeOutput')[0], blocklyCtrl);


$('#downloadBtn').click(() => pythonWidget.download());

