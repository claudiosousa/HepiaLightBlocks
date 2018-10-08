export default async filetype => {
    return new Promise(resolve => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = filetype;
        $(input).change(e => {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = e => resolve([file.name, e.target.result])
            reader.readAsText(file);
        });
        input.click();
    });
}

