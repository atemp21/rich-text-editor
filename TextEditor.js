import Toolbar from './Toolbar.js';
export class TextEditor {

    constructor(width, height) {
        this.width = width || 500;
        this.height = height || 500;
        this.editor = document.getElementById("rich-text-editor");
        this.bar = new Toolbar();// toolbar
        this.focusedElement;//element that will be focused
        this.elementID = 0;// element id increment
        this.init();
    }

    //initialize the editor and a a default <p> element and
    //event listeners on tool buttons
    init() {
        this.editor.style.width = this.width;
        this.editor.style.height = this.height;
        this.bar.setupToolbar();

        this.createTag("", this.getActiveTags(), this.getActiveStyle());

        let tools = document.querySelectorAll(".editor-button");
        tools.forEach(t => {
            t.addEventListener('click', (e) => {
                this.updateStyle(e);
            });
        });
    }

    //handles a letter key press based on element type
    handleKey(e) {
        let char = String.fromCharCode(e.keyCode);
        if (e.keyCode == 13) {//enter key
            e.preventDefault();
            if (this.isList(this.focusedElement) && this.focusedElement.innerHTML !== "") {
                var li = document.createElement("li");
                this.focusedElement.parentNode.appendChild(li);
                this.focusedElement = this.focusedElement.parentNode.lastChild;
                this.focusedElement.focus();
            } else if (this.isList(this.focusedElement) && this.focusedElement.innerHTML === "") {
                this.focusedElement.parentNode.removeChild(this.focusedElement);
                this.createTag(char, this.getActiveTags(), this.getActiveStyle());
                this.editor.lastChild.focus();
            } else {
                this.createTag(char, this.getActiveTags(), this.getActiveStyle());
                this.editor.lastChild.focus();
            }

        }


    }
    //returns the active tool buttons of type tag (html tags)
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
    //returns the active style tool buttons (css)
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
    //creates a new html tag based on active tools
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
            el.id = "editor-" + this.elementID;
            this.editor.appendChild(el);
            this.focusedElement = el.lastChild;
        } else {
            el.style = style;
            el.innerHTML = char;
            el.contentEditable = true;
            el.id = "editor-" + this.elementID;
            this.editor.appendChild(el);
            this.focusedElement = el;
        }

        this.elementID++;


    }
    //updates the focused elements css, and tag
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
        } else if (newel == "order-list" || newel == "unorder-list") {
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
                this.focusedElement = newTag.lastChild;
            } else {

                newTag.innerHTML = this.focusedElement.innerHTML;
                this.focusedElement.parentNode.replaceChild(newTag, this.focusedElement);
                this.focusedElement = newTag;

            }
        }
    }

    //returns the tag type in html format of the given element
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
    // gets the contents of a list elements <li>'s (ul or ol)
    getListContents(el) {
        let parent = el.parentNode;
        let text = parent.innerHTML;
        text = text.replace(/<li>/gi, "");
        text = text.replace("</li>", "");
        return text;
    }
    //returns an array of <li>'s content for easy list to list conversions
    listToList(arr) {
        var items = [];
        arr.forEach(i => {
            items.push(i);
        });
        return items;
    }
    //changes the active buttons when an element is clicked
    getSectionStyle() {
        let tag = this.focusedElement.tagName;
        let style = this.focusedElement.style.cssText;

        let activeTag;
        switch (tag) {
            case "P":
                activeTag = "paragraph";
                break;
            case "H1":
                activeTag = "header";
                break;
            case "OL":
                activeTag = "order-list";
                break;
            case "UL":
                activeTag = "unorder-list";
                break;
        }

        this.bar.buttons.forEach(b => {
            if (b.type == "tag" && b.name == activeTag) {
                this.bar.toggleActive(b);
            }
            if (b.type == "style" || b.type == "align") {
                if (style.includes(b.style)) this.bar.toggleActive(b);
            }
        });
    }
    //handle non letter keys
    handleNonLetterKeys(e) {

        switch (e.keyCode) {
            case 37: //left arrow
            case 38: //up arrow
            case 39: //right arrow
            case 40: //down arrow
                break;
            case 16: //shift
                break;
            case 9: //tab
                break;
        }
    }
    //change the focus in the editor
    focusChild() {
        let children = this.editor.children;
        for (var i = 0; i < children.length; i++) {
            if(this.focusedElement.id == children[i].id){
                document.getElementById(children[i].id).focus();
            }
        }
    }


}

const richEditor = new TextEditor();

window.addEventListener("keypress",
    function (e) {
        richEditor.handleKey(e);
    });

window.addEventListener('keydown', function (e) {
    richEditor.handleNonLetterKeys(e);
})

window.addEventListener('click', function (e) {
    let editor = document.getElementById('rich-text-editor');
    if (e.target == editor) {
        //focus on last tag in editor
        editor.lastChild.focus();
        richEditor.focusedElement = editor.lastChild;
    }
    if (e.target.parentNode == editor) {
        richEditor.focusedElement = e.target;
        richEditor.getSectionStyle();
    }
});