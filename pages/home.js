window.onscroll = function() {
    var elems = document.getElementsByClassName('scroll-fade-in-out');   

    for (var i = 0; i < elems.length; i++) {
        var elem = elems[i];
        var elemTop = elem.offsetTop - window.scrollY;
        var elemHeight = elem.offsetHeight;
        var padding = 20;

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

    var bgv = document.getElementById("bgv");
    var bgvRect = bgv.getBoundingClientRect();
    var bgvBottom = bgvRect.bottom;
    
    if (bgvBottom > window.innerHeight * 0.5) {
        if (bgv.paused) {
            bgv.play();
        }
    }
    else {
        if (!bgv.paused) {
            bgv.pause();
        }
    }
};
