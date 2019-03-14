import Toolbar from './Toolbar.js';
export class TextEditor {

    constructor(width, height) {
        this.width = width || 500;
        this.height = height || 500;
        this.editor = document.getElementById("rich-text-editor");
        this.bar = new Toolbar();
        this.focusedElement;
        this.init();
    }

    init() {
        this.editor.style.width = this.width;
        this.editor.style.height = this.height;
        this.bar.setupToolbar();
        
        let p = document.createElement("p");
        p.contentEditable = true;
        this.editor.appendChild(p);

        let tools = document.querySelectorAll(".editor-button");
        tools.forEach(t => {
            t.addEventListener('click', (e) => {
                this.updateStyle(e);
            });
        });
    }

    handleKey(e) {
        let char = String.fromCharCode(e.keyCode);

        if (e.keyCode == 13) {
            e.preventDefault();
            if(this.isList(this.focusedElement)){
                var li = document.createElement("li");
                this.focusedElement.parentNode.appendChild(li);
                this.focusedElement = this.focusedElement.parentNode.lastChild;
                this.focusedElement.focus();
            }else{
            this.createTag(char, this.getActiveTags(), this.getActiveStyle());
            this.editor.lastChild.focus();  
            }
            
        }


    }

    getActiveTags() {
        let tag = "";
        this.bar.buttons.forEach(button => {
            if (button.active) {
                if (button.type == "tag") {
                    tag = button.name;
                }
            }
        });
        return tag;
    }

    getActiveStyle() {

        let style = "";
        this.bar.buttons.forEach(button => {
            if (button.active) {
                if (button.type == "style" || button.type == "align") {
                    style += button.style;
                }
            }
        });
        return style;
    }

    createTag(char, tag, style) {

        let el;
        let li;
        switch (tag) {

            case "paragraph":
                el = document.createElement("p");
                break;

            case "header":
                el = document.createElement("h1");
                break;

            case "order-list":
                el = document.createElement("ol");
                break;

            case "unorder-list":
                el = document.createElement("ul");
                break;

            default:
                el = document.createElement("div");
                break;

        }
        if (tag == "order-list" || tag == "unorder-list") {
            li = document.createElement("li");
            li.innerHTML = char;
            el.appendChild(li);
            el.style = style;
            el.contentEditable = true;
            this.editor.appendChild(el);
        } else {
            el.style = style;
            el.innerHTML = char;
            el.contentEditable = true;
            this.editor.appendChild(el);
        }

    }

    updateStyle(e) {
        e.preventDefault();
        let newel = this.getActiveTags();
        let style = this.getActiveStyle();
        let newTag = document.createElement(this.getTagType(newel));
        newTag.style = style;
        var li;
        if ((newel == "order-list" && this.isList(this.focusedElement)) ||
            (newel == "unorder-list" && this.isList(this.focusedElement))) {
            var list = this.listToList(this.focusedElement.parentNode.childNodes);
            list.forEach(item => {
                var li = document.createElement("li");
                li.innerHTML = item.innerHTML;
                newTag.appendChild(li);
            });
            newTag.contentEditable = true;
            let parent = this.focusedElement.parentNode.parentNode;
            parent.replaceChild(newTag, this.focusedElement.parentNode);
            this.focusedElement = newTag.lastChild;

        }
        else if (newel == "order-list" || newel == "unorder-list") {
            li = document.createElement("li");
            li.innerHTML = this.focusedElement.innerHTML;
            newTag.appendChild(li);
            newTag.contentEditable = true;
            this.focusedElement.parentNode.replaceChild(newTag, this.focusedElement);
            this.focusedElement = newTag.lastChild;
        } else {

            newTag.contentEditable = true;
            if (this.isList(this.focusedElement)) {
                newTag.innerHTML = this.getListContents(this.focusedElement);
                let parent = this.focusedElement.parentNode.parentNode;
                parent.replaceChild(newTag, this.focusedElement.parentNode);
                this.focusedElement = newTag;
            } else {

                newTag.innerHTML = this.focusedElement.innerHTML;
                this.focusedElement.parentNode.replaceChild(newTag, this.focusedElement);
                this.focusedElement = newTag;
            }
        }
    }

    getTagType(tag) {
        let el;
        switch (tag) {

            case "paragraph":
                el = "p";
                break;

            case "header":
                el = "h1";
                break;

            case "order-list":
                el = "ol";
                break;

            case "unorder-list":
                el = "ul";
                break;

            default:
                el = "div";
                break;

        }
        return el;
    }

    isList(el) {
        if (el.tagName == "LI") return true;
        return false;
    }

    getListContents(el) {
        let parent = el.parentNode;
        let text = parent.innerHTML;
        text = text.replace(/<li>/gi, "");
        text = text.replace("</li>", "");
        return text;
    }

    listToList(arr) {
        var items = [];
        arr.forEach(i => {
            items.push(i);
        });
        return items;
    }


}

const richEditor = new TextEditor();

window.addEventListener("keypress",
    function (e) {
        richEditor.handleKey(e);
    });

window.addEventListener('click', function (e) {
    let editor = document.getElementById('rich-text-editor');
    if (e.target == editor) {
        //focus on last tag in editor
        editor.lastChild.focus();
        richEditor.focusedElement = editor.lastChild;
    }
    if (e.target.parentNode == editor) {
        richEditor.focusedElement = e.target;
    }
});