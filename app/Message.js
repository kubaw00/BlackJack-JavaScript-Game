export class Message {
    constructor(element){
        this.element = element
    }s

    setText(message) {
        this.element.innerHTML = message;

        return this;
    }

    show(){
        this.element.style.display = 'block'
    }

    hide(){
        this.element.style.display = 'none'
    }

}