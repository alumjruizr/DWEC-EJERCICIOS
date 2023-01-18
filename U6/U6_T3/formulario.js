window.addEventListener("load", function(){
    /*console.log("Hola mundo")
    let h = document.createElement("h1")
    let t = document.createTextNode("Hola Mundo")
    document.body.appendChild(h);
    h.appendChild(t);*/

    let divContainer = document.createElement("div");
    let form = document.createElement("form");
    this.document.body.appendChild(divContainer);
    divContainer.appendChild(form);
    let formAttribute = document.createAttribute("id");
    let formAction = document.createAttribute("action");
    formAttribute.value = "form";
    formAction.value = "";
    form.setAttributeNode(formAttribute);
    form.setAttributeNode(formAction);

    let fieldset = this.document.createElement("fieldset");
    form.appendChild(fieldset);
    let styleFieldset = document.createAttribute("style");
    styleFieldset.value = "display: inline";

    let b1 = document.createElement("b");
    let labelDiscName = document.createElement("label");
    let inputDiscName = document.createElement("input");
    let forAttribute = document.createAttribute("for");
    forAttribute.value = "dni";
    labelDiscName.setAttributeNode(forAttribute);
    labelDiscName.appendChild(this.document.createTextNode("Nombre del disco: "))

    fieldset.appendChild(b1);
    b1.appendChild(labelDiscName);
    fieldset.appendChild(inputDiscName);
    


    



});