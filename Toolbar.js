export default class Toolbar {

    constructor() {
        this.toolbar = document.getElementById("rich-text-editor-toolbar");
        this.buttons = [];
    }

    setupToolbar() {
        this.createButtons();
        this.toolbar.style.width = document.getElementById("rich-text-editor").style.width;
    }

    createButtons() {
        this.buttons.push(new Button("bold", "style", "font-weight: bold;", false));
        this.buttons.push(new Button("italic", "style", "font-style: italic;", false));
        this.buttons.push(new Button("underline", "style", "text-decoration: underline;", false));
        this.buttons.push(new Button("left-align", "style", "text-align: left;", false));
        this.buttons.push(new Button("middle-align", "style", "text-align: center;", false));
        this.buttons.push(new Button("right-align", "style", "text-align: right;", true));
        this.buttons.push(new Button("order-list", "tag", null, false));
        this.buttons.push(new Button("unorder-list", "tag", null, false));
        this.buttons.push(new Button("paragraph", "tag", null, true));
        this.buttons.push(new Button("header", "tag", null, false));


        for (let i = 0; i < this.buttons.length; i++) {
            
            let b = document.createElement("BUTTON");
            b.className = "editor-button";
            b.id = this.buttons[i].name + "-button";
            b.setAttribute('btn-type', this.buttons[i].type);
            if (this.buttons[i].active == true) {
                b.className = "editor-button active";
            }
            this.toolbar.appendChild(b);
            b.addEventListener('click', ()=>{this.toggleActive(b);});
        }
    }

    isActive(button) {
        if (button.classList == "active") {
            return true;
        }
        return false;
    }

    toggleActive(b) {
       var t = document.getElementById(b.id).getAttribute("btn-type");
        if (t == "tag") {
            this.removeActiveFromTagButtons();
        }
        b.classList.toggle("active");
    }

    removeActiveFromTagButtons() {
        for (var k = 0; k < this.buttons.length; k++) {
            if (this.buttons[k].type == "tag") {  
                console.log(this.buttons[k]);
                document.getElementById(this.buttons[k].name+"-button").classList.remove("active");
            }
        }

    }

}

class Button {

    constructor(name, type, style, active) {
        this.name = name;
        this.type = type;
        this.style = style;
        this.active = active;
    }
}
