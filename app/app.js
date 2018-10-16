import './blockly-designer/index.js';
import './code-editor/Widget.js';

const blocklyDesigner = $('blockly-designer')[0];
const pythonWidget = $('python-widget')[0];

pythonWidget.setBlockly(blocklyDesigner);

$('#downloadBtn').click(() => pythonWidget.download());
$('#saveBtn').click(() => blocklyDesigner.downloadXml());
$('#loadBtn').click(() => blocklyDesigner.loadFromFile());
