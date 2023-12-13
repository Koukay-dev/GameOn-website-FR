

/**
 * Crée une annotation sous l'élément parent (parentElement) contenant le message (msg)
 * @param {Element} parentElement - L'élément du DOM sous lequel l'annotation sera créée.
 * @param {string} msg - Le message de l'annotation.
 */
class Annotation {
    constructor(parentElement, msg){
        if (!parentElement || !msg) {
            throw new Error('Les paramètres parentElement et msg sont requis.');
        }

        this.parent = parentElement;
        this.msg = msg;
        this.element = this._createDOMElement();
    }

    _createDOMElement(){
        const annotationContainer = document.createElement('div');
        annotationContainer.classList.add('annotation');

        const annotationText = document.createElement('p');
        annotationText.innerText = this.msg;

        annotationContainer.append(annotationText);

        return annotationContainer;
    }
      
    show(){
        this.parent.insertBefore(this.element, null);
    }

    hide(){
        if(this.element){
            this.element.parentNode.removeChild(this.element);
        }
    }

    isError(){
        this.element.classList.add('Error');
    }

}