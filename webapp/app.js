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

$('.dropdown-btn').dropdown();

(async () => {
    const tutorialResponse = await fetch('tutorial/tutorial1.md');
    const tutorialMd = await tutorialResponse.text();

    const converter = new showdown.Converter({ extensions: ['prettify'] });
    let html = converter.makeHtml(tutorialMd);

    // $("#myModal").draggable({
    //     handle: ".modal-header"
    // });

    $('#myModal').modal({ backdrop: false });

    PR.prettyPrint();

    setTimeout(() => {
        BootstrapDialog.show({
            title: 'Tutorial',
            draggable: true,
            size: BootstrapDialog.SIZE_WIDE,
            closable: false,
            message: $(html),
            buttons: [
                {
                    label: 'Next',
                    action: dialogRef => dialogRef.close()
                }
            ]
        });
        setTimeout(() => PR.prettyPrint(), 200);
    }, 100000);
})();
