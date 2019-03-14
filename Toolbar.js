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
        this.buttons.push(new Button("bold", "style", "font-weight: bold;", false, "fas fa-bold"));
        this.buttons.push(new Button("italic", "style", "font-style: italic;", false, "fas fa-italic"));
        this.buttons.push(new Button("underline", "style", "text-decoration: underline;", false, "fas fa-underline"));
        this.buttons.push(new Button("left-align", "align", "text-align: left;", true, "fas fa-align-left"));
        this.buttons.push(new Button("middle-align", "align", "text-align: center;", false, "fas fa-align-center"));
        this.buttons.push(new Button("right-align", "align", "text-align: right;", false, "fas fa-align-right"));
        this.buttons.push(new Button("order-list", "tag", null, false, "fas fa-list-ol"));
        this.buttons.push(new Button("unorder-list", "tag", null, false, "fas fa-list"));
        this.buttons.push(new Button("paragraph", "tag", null, true, "fas fa-paragraph"));
        this.buttons.push(new Button("header", "tag", null, false, "fas fa-heading"));


        for (let i = 0; i < this.buttons.length; i++) {
            
            let b = document.createElement("BUTTON");
            b.className = "editor-button";
            b.id = this.buttons[i].name + "-button";
            b.setAttribute('btn-type', this.buttons[i].type);
            if (this.buttons[i].active == true) {
                b.className = "editor-button active";
            }
            let icon = document.createElement("i");
            icon.className = this.buttons[i].icon;
            b.appendChild(icon);
            this.toolbar.appendChild(b);
            b.addEventListener('click', ()=>{this.toggleActive(this.buttons[i]);});
        }
    }
    //toggles the active state of the tool button
    toggleActive(b) {
        if (b.type == "tag") {
            this.removeActiveFromTagButtons(b.name);
        }
        if(b.type == "align"){
            this.removeActiveFromAligns(b.name);
        }
        b.active = b.active ? false : true;
        document.getElementById(b.name+"-button").classList.toggle("active");
    }
    //removes active css class and active property from tool button
    //so only one tag can be active
    removeActiveFromTagButtons(name) {
        for (var k = 0; k < this.buttons.length; k++) {
            if (this.buttons[k].type == "tag" && this.buttons[k].name != name) {  
                document.getElementById(this.buttons[k].name+"-button").classList.remove("active");
                this.buttons[k].active = false;
            }
        }
    }
        //removes active css class and active property from tool button
        //so only one align can be active
    removeActiveFromAligns(name){
        for (var k = 0; k < this.buttons.length; k++) {
            if (this.buttons[k].type == "align" && this.buttons[k].name != name) {  
                document.getElementById(this.buttons[k].name+"-button").classList.remove("active");
                this.buttons[k].active = false;

            }
        }
    }

}

class Button {

    constructor(name, type, style, active, icon) {
        this.name = name;
        this.type = type;
        this.style = style;
        this.active = active;
        this.icon = icon;
    }
}
