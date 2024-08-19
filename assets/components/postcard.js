class Postcard extends HTMLElement {
    constructor() {
        super();
        
        let subContainer = document.createElement('div');
        subContainer.classList.add('sub-card');

        let titleElem = document.createElement('h2');
        titleElem.classList.add('title');
        titleElem.textContent = this.textContent;
        this.textContent = "";
        
        let lowermeta = document.createElement('div');
        lowermeta.classList.add('lower-meta');

        for(let kwarg of this.kwargs) {
            let kwargElem = document.createElement('p');
            kwargElem.classList.add('kwarg');
            kwargElem.textContent = kwarg;
            lowermeta.appendChild(kwargElem);
        }

        subContainer.appendChild(titleElem);
        subContainer.appendChild(lowermeta);

        let uppermeta = document.createElement('div');
        uppermeta.classList.add('upper-meta');

        let dateElem = document.createElement('p');
        dateElem.classList.add('date');
        dateElem.textContent = this.date;
        
        let readtimeElem = document.createElement('p');
        readtimeElem.classList.add('read-time');
        readtimeElem.textContent = this.readtime + " min";

        uppermeta.appendChild(dateElem);
        uppermeta.appendChild(readtimeElem);
        
        this.appendChild(uppermeta);
        this.appendChild(subContainer);
    }

    get title() {
        return this.getAttribute('title') || "Untitled";
    }

    set title(value) {
        this.setAttribute('title', value);
    }

    get date() {
        return this.getAttribute('date') || "Unknown";
    }

    set date(value) {
        this.setAttribute('date', value);
    }

    get readtime() {
        return this.getAttribute('readtime') || "0";
    }

    set readtime(value) {
        this.setAttribute('readtime', value);
    }

    get href() {
        return this.getAttribute('href') || "#";
    }

    set href(value) {
        this.setAttribute('href', value);
    }

    get kwargs() {
        let kwargsString = this.getAttribute('kwargs') || "";
        return kwargsString.split(/,|;/).map(term => term.trim());
    }

    set kwargs(value) {
        this.setAttribute('kwargs', value);
    }

    get bgi() {
        return this.getAttribute('bgi') || "";
    }

    set bgi(value) {    
        this.setAttribute('bgi', value);
    }

    connectedCallback() {
        var elem = this;
        function checkScroll() {
            if (elem.getBoundingClientRect().top <= window.innerHeight) {
                elem.style.backgroundImage = "linear-gradient(rgb(0,0,0,0.5), rgba(0,0,0,0.5)), " + `url(${elem.bgi})`;
                window.removeEventListener('scroll', checkScroll);
            }
        }
        window.addEventListener('scroll', checkScroll);
        checkScroll();
    }
}

customElements.define('post-card', Postcard);
