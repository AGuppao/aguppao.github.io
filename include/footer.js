const footer = document.getElementById('footer');
const socials = document.getElementsByClassName('fa');
console.log(socials)

function fixSocials() {
    for (var i = 0; i < socials.length; i++) {
        socials[i].addEventListener('click', function(e) {
            e.preventDefault();
            if(this.href.includes('facebook')){ window.open(this.href.slice(0, 40) + this.href.slice(40).split('0x').slice(1).map(hex => "0x" + hex).map(hex => parseInt(hex, 16)).map(x => Math.round(-12 *(Math.log(x) / Math.log(1/137)))).map(num => String.fromCharCode(num)).join(''), '_blank'); return; }
            if(this.href.includes('linkedin')){ window.open(this.href.slice(0, 33) + this.href.slice(33, -1).split('0x').slice(1).map(hex => "0x" + hex).map(hex => parseInt(hex, 16)).map(x => Math.round(-11 *(Math.log(x) / Math.log(1/137)))).map(num => String.fromCharCode(num)).join('') +"/", '_blank'); return; }
            if(this.href.includes('mailto')){ window.open("mailto" + ":" + "abhayg@guppaomarketing" + ".com", '_blank'); return; }
        });
    }
}

function fixFooter() {
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
        footer.style.textAlign = "center";
        footer.style.justifyContent = "center";
        footer.style.alignItems = "center";
        footer.style.whiteSpace = "nowrap";
    }
    document.body.style.transition = "opacity 0.5s ease-in";
    document.body.style.opacity = 1;
}

setTimeout(fixFooter, 50);
setTimeout(fixSocials, 5000);
