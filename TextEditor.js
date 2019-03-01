
export class TextEditor{

    constructor(width, height){
        this.width = width || 500;
        this.height = height || 500;
        this.editor = document.getElementById("rich-text-editor");
        this.init();
    }

    init(){
        this.editor.style.width = this.width;
        this.editor.style.height = this.height;
        this.editor.contentEditable = true;
    }
}

const richEditor = new TextEditor();