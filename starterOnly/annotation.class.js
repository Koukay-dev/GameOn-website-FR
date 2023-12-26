

/**
 * Crée une annotation sous l'élément target (targetElement) contenant le message (msg)
 * @param {Element} targetElement - L'élément du DOM sous lequel l'annotation sera créée.
 * @param {string} msg - Le message de l'annotation.
 */
class Annotation {
    constructor(targetElement, msg){
        if (!(targetElement instanceof Element)) {
            throw new Error('Le paramètre targetElement doit être de type Element, alors que targetElement = ' + targetElement);
        } else if(typeof msg !== 'string' ) {
            throw new Error('Le paramètre msg doit être de type string, alors que msg = ' + msg);
        }
        
        
        this.target = targetElement;
        this.msg = msg;
        this.element = this._createDOMElement();
    }

    _createDOMElement(){
        const parentContainer = document.createElement('div'); // parent qui va contenir l'élément target puis l'annotation
        //parentContainer.style.position = 'relative';

        this.annotationContainer = document.createElement('div');
        this.annotationContainer.classList.add('annotation');

        const annotationText = document.createElement('p');
        annotationText.innerText = this.msg;

        this.annotationContainer.append(annotationText);

        //parentContainer.appendChild(this.target);
        parentContainer.appendChild(this.annotationContainer);

        return parentContainer;
    }
    
    _clearClasses() {
        this.annotationContainer.className = 'annotation';
    }
      
    show(){
        this.target.parentElement.insertBefore(this.element, this.target.nextSibling);
    }

    hide(){
        if(this.element){
            this.element.remove();
            //à enlever plus tard | debut
            this.target.style.border = "";
            //à enlever plus tard | fin
        }
    }

    isError() {
        this._clearClasses();
        //à enlever plus tard | debut
        if (this.target.tagName.toLowerCase() === 'input'){
            this.target.style.border = "2px solid #FF4E60"; 
        }
        //à enlever plus tard | fin
        this.annotationContainer.classList.add('annotation-error');
    }

    isWarning() {
        this._clearClasses();
        this.annotationContainer.classList.add('annotation-warning');
    }

    isSuccess() {
        this._clearClasses();
        this.annotationContainer.classList.add('annotation-success');
    }

}

export default Annotation;