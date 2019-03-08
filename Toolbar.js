export default class Toolbar{

    constructor(){
        this.toolbar = document.getElementById("rich-text-editor-toolbar");
    }

    setupToolbar(){
        this.createButtons();
        this.toolbar.style.width = document.getElementById("rich-text-editor").style.width;
    }

    createButtons(){
        var bold = document.createElement("BUTTON");
        bold.className = "editor-button";
        bold.id = "bold-button";
        this.toolbar.appendChild(bold);
 
        var italic = document.createElement("BUTTON");
        italic.className = "editor-button";
        italic.id = "italic-button";
        this.toolbar.appendChild(italic);
 
        var underline = document.createElement("BUTTON");
        underline.className = "editor-button";
        underline.id = "underline-button";
        this.toolbar.appendChild(underline);
 
        var fontSize = document.createElement("BUTTON");
        fontSize.className = "editor-button";
        fontSize.id = "fontSize-button";
        this.toolbar.appendChild(fontSize);
 
        var fontFam = document.createElement("BUTTON");
        fontFam.className = "editor-button";
        fontFam.id = "fontFam-button";
        this.toolbar.appendChild(fontFam);
 
        var format = document.createElement("BUTTON");
        format.className = "editor-button";
        format.id = "format-button";
        this.toolbar.appendChild(format);
 
        var leftAlign = document.createElement("BUTTON");
        leftAlign.className = "editor-button";
        leftAlign.id = "leftAlign-button";
        this.toolbar.appendChild(leftAlign);
 
        var middleAlign = document.createElement("BUTTON");
        middleAlign.className = "editor-button";
        middleAlign.id = "middleAlign-button";
        this.toolbar.appendChild(middleAlign);
 
        var rightAlign = document.createElement("BUTTON");
        rightAlign.className = "editor-button";
        rightAlign.id = "rightAlign-button";
        this.toolbar.appendChild(rightAlign);
 
        var olist = document.createElement("BUTTON");
        olist.className = "editor-button";
        olist.id = "olist-button";
        this.toolbar.appendChild(olist);
 
        var ulist = document.createElement("BUTTON");
        ulist.className = "editor-button";
        ulist.id = "ulist-button";
        this.toolbar.appendChild(ulist);  
     }

    }

    class Button{
        
        constructor(){
            
        }
    }

    window.addEventListener('click', function(e){
        if(e.target && e.target.className == 'editor-button' || e.target.className =='editor-button active'){
            e.preventDefault();
            e.target.classList.toggle("active");
        }
    })