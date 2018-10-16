import { Controller as BlocklyController } from './blockly-designer/Controller.js';
import { Widget as PythonWidget } from './code-editor/Widget.js';

const blocklyCtrl = new BlocklyController($('#blocklyContainer')[0]);

const pythonWidget = new PythonWidget($('#codeOutput')[0], blocklyCtrl);

$('#downloadBtn').click(() => pythonWidget.download());
$('#saveBtn').click(() => blocklyCtrl.downloadXml());
$('#loadBtn').click(() => blocklyCtrl.loadFromFile());
