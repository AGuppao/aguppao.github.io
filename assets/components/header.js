const navs = {'hb-home': ['Home', '<i class="fa fa-home" title="Home"></i>'],'hb-fc': ['Free Consultation', '<i class="fa fa-address-book-o" title="Free Consultation"></i>'],'hb-more': ['More <i class="fa fa-caret-down"></i>', '<i class="fa fa-ellipsis-h" title="More"></i>'],'hb-services': ['Services', '<i class="fa fa-cogs" title="Services"></i>'],'hb-faq': ['FAQ', '<i class="fa fa-question-circle" title="FAQ"></i>'],'hb-blog': ['Blog', '<i class="fa fa-newspaper-o" title="Blog"></i>']};function headerposition(){if (window.scrollY > 0 && !doonce) {header.classList.add('floating');main.style.borderRadius = '160px';[home, fc, more, services, faq, blog].forEach(element => {element.style.animation = 'fdwn 0.4s forwards';element.onanimationend=()=>{element.innerHTML = navs[element.id][1];element.classList.add('hicons');element.style.animation = 'fup 0.4s forwards';}});doonce = true;}else if(window.scrollY <= 0 && doonce) {header.classList.remove('floating');main.style.borderRadius = '0px';[home, fc, more, services, faq, blog].forEach(element => {element.style.animation = 'fdwn 0.4s forwards';element.onanimationend=()=>{element.innerHTML = navs[element.id][0];element.classList.remove('hicons');element.style.animation = 'fup 0.4s forwards';}});doonce = false;}}var header=document.querySelector('header'),main=document.getElementById('main'),home=document.getElementById('hb-home'),fc=document.getElementById('hb-fc'),more=document.getElementById('hb-more'),services=document.getElementById('hb-services'),faq=document.getElementById('hb-faq'),blog=document.getElementById('hb-blog'),doonce=false;window.history.scrollRestoration='manual';document.getElementById('spacer').style.height=header.clientHeight+'px';window.addEventListener('scroll', headerposition);