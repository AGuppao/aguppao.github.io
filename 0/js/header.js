const navs = {
    'hb-home': ['Home', '<i class="fa fa-home" title="Home"></i>'],
    'hb-fc': ['Free Consultation', '<i class="fa fa-address-book-o" title="Free Consultation"></i>'],
    'hb-more': ['More <i class="fa fa-caret-down"></i>', '<i class="fa fa-ellipsis-h" title="More"></i>'],
    'hb-info': ['Info', '<i class="fa fa-info-circle" title="Info"></i>'],
    'hb-guide': ['Guides', '<i class="fa fa-book" title="Guides"></i>'],
    'hb-blog': ['Blog', '<i class="fa fa-newspaper-o" title="Blog"></i>']
};

var header=document.querySelector('header'),main=document.getElementById('main'),hlinks=document.querySelectorAll('header a:not(#theme)'),doonce=false;
window.history.scrollRestoration='manual';
document.getElementById('spacer').style.height=header.clientHeight+'px';
window.addEventListener('scroll',()=>{
    if (window.scrollY > 0 && !doonce){
        header.classList.add('floating');
        main.style.borderRadius = '160px';
        hlinks.forEach(element=>{
            element.style.animation = 'fdwn 0.4s forwards';
            element.onanimationend=()=>{
                element.innerHTML = navs[element.id][1];
                element.classList.add('hicons');
                element.style.animation = 'fup 0.4s forwards';
            }
        });
        doonce = true;
    }
    else if(window.scrollY <= 0 && doonce){
        header.classList.remove('floating');
        main.style.borderRadius = '0px';
        hlinks.forEach(element=>{
            element.style.animation = 'fdwn 0.4s forwards';
            element.onanimationend=()=>{
                element.innerHTML = navs[element.id][0];
                element.classList.remove('hicons');
                element.style.animation = 'fup 0.4s forwards';
            }
        });
        doonce = false;
    }
});