import './blockly-designer/index.js';
import './code-editor/Widget.js';
import downloadFile from './tools/downloadFile.js';

const blocklyDesigner = $('blockly-designer')[0];
const pythonWidget = $('python-widget')[0];

pythonWidget.setBlockly(blocklyDesigner);

$('.download-btn').click(() =>
    downloadFile('MAIN.PY', blocklyDesigner.getPythonCode())
);

const projectName = $('[name="project-name"]');
const saveBtn = $('.save-btn');
saveBtn.click(() => {
    projectName.val(projectName.val() || 'hepialight-untitled.xml');
    downloadFile(projectName.val(), blocklyDesigner.getXml());
});

//ondrop="dropHandler(event);" ondragover="dragOverHandler(event);
$(document.body)
    .on('dragover', ({ originalEvent: e }) => {
        e.stopPropagation();
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';
    })
    .on('drop', ({ originalEvent: e }) => {
        e.stopPropagation();
        e.preventDefault();

        if (e.dataTransfer.files.length < 1) return;
        const file = e.dataTransfer.files[0];
        if (file.type != 'text/xml') return;

        const reader = new FileReader();
        reader.onload = e => {
            blocklyDesigner.loadXml(e.target.result);
            projectName.val(file.name);
        };
        reader.readAsText(file);
    });
