function scrollfadebox(){
    for (var i = 0; i < elems.length; i++) {
        var elem = elems[i];
        var elemTop = elem.offsetTop - window.scrollY;
        var elemHeight = elem.offsetHeight;
        var padding = -50;

        if (elemTop < window.innerHeight - elemHeight - padding && elemTop > padding) {
            elem.classList.remove('hidden');
            elem.classList.add('visible');
        }
        else
        {
            elem.classList.remove('visible');
            elem.classList.add('hidden');
        }
    }
}

var elems = document.getElementsByClassName('scroll-fade-box');
window.addEventListener('scroll', scrollfadebox)
