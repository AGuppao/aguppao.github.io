class Collapsible extends HTMLElement {
    constructor() {
        super();

        let btn = document.createElement('button');
        btn.classList.add('dd-button');
        btn.innerHTML = '<p></p><h2>' + this.title + '</h2>';

        let cntnt = document.createElement('div');
        cntnt.classList.add('dd-content');
        cntnt.innerHTML = this.innerHTML;
        this.innerHTML = "";

        this.appendChild(btn);
        this.appendChild(cntnt);
    }

    get title() {
        return this.getAttribute('title') || "Untitled";
    }

    set title(value) {
        this.setAttribute('title', value);
    }

    connectedCallback() {
      const button = this.querySelector('button');
      const content = this.querySelector('div');

      button.addEventListener('click', function() {
        this.classList.toggle("active");          
        if (content.style.maxHeight){
          content.style.maxHeight = null;
        }
        else {
          content.style.maxHeight = content.scrollHeight + 10 + "px";
        }
      });
    }
}

customElements.define('drop-down', Collapsible);
