export default class TutorialService {
    static get TUTORIAl_ID() {
        return 'markdown-tutorial';
    }

    constructor(blocklyDesigner) {
        this.blocklyDesigner = blocklyDesigner;
        this.converter = new showdown.Converter({ extensions: ['prettify'] });
        this.converter.setOption('parseImgDimensions', true);
    }

    buildModalHtml(content) {
        return `
        <div class="modal fade tutorial-modal" role="dialog">
            <style></style>
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">Tutorial</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    </div>
                    <div class="modal-body" id="${TutorialService.TUTORIAl_ID}">
                        ${content}
                    </div>
                    <div class="modal-footer">
                        <button id="previous" type="button" class="btn btn-info" onclick="tutorial.previousPage()" >Précédent</button>
                        <div style="flex-grow:1"></div>
                        <button id="next" type="button" class="btn btn-primary" onclick="tutorial.nextPage()">Prochain</button>
                        <button id="close" type="button" class="btn btn-danger" data-dismiss="modal">Fermer</button>
                        <span class="modal-progress"></span>
                    </div>
                </div>
            </div>
        </div>`;
    }

    async displayTutorial() {
        this.destroyModal();

        const tutorialResponse = await fetch('tutorial/tutorial1.md');
        const tutorialMd = await tutorialResponse.text();
        const tutorialHtml = this.converter.makeHtml(tutorialMd);

        const modalHtml = this.buildModalHtml(tutorialHtml);
        const paragraphs = modalHtml.match(/\<h1/g);
        const pages = paragraphs ? paragraphs.length : 0;
        const modal = $(modalHtml)
            .appendTo('body')
            .modal({ backdrop: false })
            .draggable({
                handle: '.modal-header'
            });

        this.visible = {
            modal,
            style: modal.find('style'),
            progress: modal.find('.modal-progress'),
            pages,
            page: 0
        };

        this.nextPage();
    }

    destroyModal() {
        if (this.visible) {
            this.visible.modal.remove();
            this.visible = null;
        }
    }

    display(id, show) {
        this.visible.modal.find(`#${id}`)[show ? 'show' : 'hide']();
    }

    setButtonsVisibility(id, show) {
        this.display('previous', this.visible.page > 1);
        this.display('next', this.visible.page != this.visible.pages);
        this.display('close', this.visible.page == this.visible.pages);
    }

    previousPage() {
        if (this.visible.page > 0) {
            this.visible.page -= 1;
            this.showPage(this.visible.page);
        }
        this.setButtonsVisibility();
    }

    nextPage() {
        if (this.visible.page == this.visible.pages) {
            this.destroyModal();
        } else {
            this.visible.page += 1;
            this.showPage(this.visible.page);
            this.setButtonsVisibility();
        }
    }

    showPage(page) {
        this.visible.page = page;
        this.visible.progress.html(
            `${this.visible.page}/${this.visible.pages}`
        );

        const TUTORIAL = `#${TutorialService.TUTORIAl_ID}`;
        this.visible.style.html(`
            ${TUTORIAL} > * {display:none;}
            ${TUTORIAL} h1:nth-of-type(${page}), ${TUTORIAL} h1:nth-of-type(${page}) ~ * {display:block;}
            ${TUTORIAL} h1:nth-of-type(${page +
            1}),${TUTORIAL} h1:nth-of-type(${page + 1}) ~ *{display:none;}
        `);
    }

    workspace(id) {
        const workspace = $(`workspace#${id}`);
        if (workspace.length) this.blocklyDesigner.loadXml(workspace.html());
    }
}
