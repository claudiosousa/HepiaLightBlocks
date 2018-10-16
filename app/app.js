import './blockly-designer/index.js';
import { Widget as PythonWidget } from './code-editor/Widget.js';

const blocklyDesigner = $('blockly-designer')[0];

const pythonWidget = new PythonWidget($('#codeOutput')[0], blocklyDesigner);

$('#downloadBtn').click(() => pythonWidget.download());
$('#saveBtn').click(() => blocklyDesigner.downloadXml());
$('#loadBtn').click(() => blocklyDesigner.loadFromFile());
