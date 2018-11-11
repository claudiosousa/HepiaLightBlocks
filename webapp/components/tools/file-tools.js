const downloadFile = (filename, text) => {
    var element = document.createElement('a');
    element.setAttribute(
        'href',
        'data:text/plain;charset=utf-8,' + encodeURIComponent(text)
    );
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
};

const uploadFile = async filetype => {
    return new Promise(resolve => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = filetype;
        $(input).change(e => {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = e => resolve([file.name, e.target.result]);
            reader.readAsText(file);
        });
        input.click();
    });
};

export { downloadFile, uploadFile };
