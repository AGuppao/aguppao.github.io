function pausebgv() {
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

window.addEventListener('scroll', pausebgv)
