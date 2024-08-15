function headertext(){
    home.innerHTML = 'Home';
    fc.innerHTML = 'Free Consultation';
    more.innerHTML = 'More <i class="fa fa-caret-down"></i>';
    services.innerHTML = 'Services';
    faq.innerHTML = 'FAQ';
    blog.innerHTML = 'Blog';
}

function headericon(){
    home.innerHTML = '<i class="fa fa-home" title="Home"></i>';
    fc.innerHTML = '<i class="fa fa-address-book-o" title="Free Consultation"></i>';
    more.innerHTML = '<i class="fa fa-ellipsis-h" title="More"></i>';
    services.innerHTML = '<i class="fa fa-cogs" title="Services"></i>';
    faq.innerHTML = '<i class="fa fa-question-circle" title="FAQ"></i>';
    blog.innerHTML = '<i class="fa fa-newspaper-o" title="Blog"></i>';
}

function clearstyletimers(){
    if(style_timer.length > 0) {
        style_timer.forEach(element => {clearTimeout(element);});
        style_timer = [];
    }
   style_timer = [];
}

function headerposition()
{
    if (window.scrollY > 0 && !doonce) {
        header.classList.add('floating');
        main.style.borderRadius = '160px';

        clearstyletimers();

        [home, fc, more, services, faq, blog].forEach(element => {
            element.style.transform = 'translateY(150%)';
            element.style.transition = 'transform 0.4 linear';

            style_timer.push(setTimeout(() => {
                element.style.transition = 'transform 0.4s ease-out, margin-left 0.5s';
                element.style.transform = 'translateY(0%)';
                element.style.marginLeft = 'auto';
                element.style.marginRight = 'auto';
                element.style.width = '100%';
                element.style.fontSize = '1.4em';
            }, 500));
        });

        clearTimeout(content_timer);
        content_timer = setTimeout(headericon, 500);
        doonce = true;
    }
    else if(window.scrollY == 0 && doonce) {
        header.classList.remove('floating');
        main.style.borderRadius = '0px';

        clearstyletimers();

        [home, fc, more, services, faq, blog].forEach(element => {
            element.style.transform = 'translateY(150%)';
            element.style.transition = 'transform 0.4s ease-in';
            
            style_timer.push(setTimeout(() => {
                element.style.transition = 'transform 0.4s ease-out, margin-left 0.5s';
                element.style.transform = 'translateY(0%)';
                element.style.marginLeft = '0';
                element.style.marginRight = '0';
                element.style.width = 'auto';
                element.style.fontSize = '1em';
            }, 500));
        });

        clearTimeout(content_timer);
        content_timer = setTimeout(headertext, 500);
        doonce = false;
    }
}

var header = document.getElementsByTagName('header')[0];
var main = document.getElementById('main');
var hbMore = document.getElementById('hb-more');
var navDown = document.getElementById('navdown');

var home = document.getElementById('hb-home');
var fc = document.getElementById('hb-fc');
var more = document.getElementById('hb-more');
var services = document.getElementById('hb-services');
var faq = document.getElementById('hb-faq');
var blog = document.getElementById('hb-blog');

var style_timer = [];
var content_timer;
var more_timer;
var doonce = true;
window.history.scrollRestoration = 'manual';

headerposition();
document.getElementById('spacer').style.height = header.clientHeight + 'px';
window.addEventListener('scroll', headerposition);
navDown.classList.add('navup');

hbMore.addEventListener('mouseover', function() {
    clearTimeout(more_timer);
    navDown.classList.remove('navup');
});

navDown.addEventListener('mouseover', function() {
    clearTimeout(more_timer);
    navDown.classList.remove('navup');
});

hbMore.addEventListener('mouseout', function() {
    more_timer = setTimeout(() => {
        navDown.classList.add('navup');
    }, 100);
});

navDown.addEventListener('mouseout', function() {
    navDown.classList.add('navup');
});

