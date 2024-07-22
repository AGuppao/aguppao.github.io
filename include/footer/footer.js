//use this to determine if the footer should be fixed to the bottom of the window.
//makes the website look more professional

var footer = document.getElementById('id-footer');

function fixFooter() {
    //only move the footer if the device is a desktop / laptop (i.e has a large screen)
    if(! /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
    {
        var rect = footer.getBoundingClientRect();
        footer.style.position = 'relative';

        var footerBottom = rect.bottom;
        var windowHeight = window.innerHeight;

        if (footerBottom <= windowHeight) {
            footer.style.position = 'fixed';
            footer.style.bottom = '0';
            footer.style.left = '0';
            footer.style.right = '0';
        } else {
            footer.style.position = 'relative';
        }
    }
    else
    {
        //reset footer styling
        footer.style.textAlign = "center";
        footer.style.justifyContent = "center";
        footer.style.alignItems = "center";
        footer.style.whiteSpace = "nowrap";
    }

    //fades the entire document's body into view when the footer is fixed
    document.body.style.transition = "opacity 0.5s ease-in";
    document.body.style.opacity = 1;
}

//delay by 50ms
setTimeout(fixFooter, 50);
