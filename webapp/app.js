import './components/blockly-designer/index.js';
import './components/code-editor/Widget.js';
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
    projectName.val(projectName.val() || 'hepialight-untitled');
    downloadFile(projectName.val() + '.xml', blocklyDesigner.getXml());
});

$('.zoom-in-btn').click(() => blocklyDesigner.zoomIn());
$('.zoom-out-btn').click(() => blocklyDesigner.zoomOut());

const hideDropArea = (timeout = 1000) =>
    (document.body.hideDropAreaTimeout = setTimeout(
        () => document.body.removeAttribute('dropping'),
        timeout
    ));

const showDropArea = () => {
    clearTimeout(document.body.hideDropAreaTimeout);
    document.body.setAttribute('dropping', 'true');
};

$(document.body)
    .on('dragover', ({ originalEvent: e }) => {
        e.stopPropagation();
        e.preventDefault();
        if (e.dataTransfer.items.length < 1) return;
        const file = e.dataTransfer.items[0];
        if (file.kind != 'file' || file.type != 'text/xml') {
            e.dataTransfer.dropEffect = 'none';
            return;
        }
        e.dataTransfer.dropEffect = 'copy';
        showDropArea();
    })
    .on('dragleave', ({ originalEvent: e }) => {
        hideDropArea();
        e.stopPropagation();
        e.preventDefault();
    })
    .on('drop', ({ originalEvent: e }) => {
        e.stopPropagation();
        e.preventDefault();
        hideDropArea(0);

        if (e.dataTransfer.files.length < 1) return;
        const file = e.dataTransfer.files[0];
        if (file.type != 'text/xml') return;

        const reader = new FileReader();
        reader.onload = e => {
            blocklyDesigner.loadXml(e.target.result);
            projectName.val(file.name.replace(/\.xml/, ''));
        };
        reader.readAsText(file);
    });

$('.left-panel').resizable({
    handleSelector: '.splitter',
    resizeHeight: false,
    resizeWidthFrom: 'right',
    onDragEnd: () => blocklyDesigner.resize()
});
