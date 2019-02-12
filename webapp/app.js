import './components/index.js';
import BlocklyDesigner from './components/blockly-designer/index.js';

$('.designer-panel').resizable({
    handleSelector: '.designer-splitter',
    resizeHeight: false,
    resizeWidthFrom: 'right',
    onDragEnd: () => BlocklyDesigner.instance.resize(),
    onDrag: () => BlocklyDesigner.instance.resize()
});

$('python-widget').resizable({
    handleSelector: '.python-splitter',
    resizeWidth: false,
    resizeHeightFrom: 'bottom'
});

$('.dropdown-btn').dropdown()