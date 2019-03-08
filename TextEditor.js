
import Toolbar from './Toolbar.js';
export class TextEditor{

    constructor(width, height){
        this.width = width || 500;
        this.height = height || 500;
        this.editor = document.getElementById("rich-text-editor");
        this.bar = new Toolbar();
        this.init();
    }

    init(){
        this.editor.style.width = this.width;
        this.editor.style.height = this.height;
        this.editor.contentEditable = true;
        this.bar.setupToolbar();
    }

    

    


}

const richEditor = new TextEditor();

window.addEventListener("keypress",
    function (e) {
        editor.passKey(e);
    });

window.addEventListener("keydown",
    function (e) {
        editor.passKey(e);
    });