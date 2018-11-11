import './components/index.js';
import BlocklyDesigner from './components/blockly-designer/index.js';

$('.left-panel').resizable({
    handleSelector: '.splitter',
    resizeHeight: false,
    resizeWidthFrom: 'right',
    onDragEnd: () => BlocklyDesigner.instance.resize()
});
