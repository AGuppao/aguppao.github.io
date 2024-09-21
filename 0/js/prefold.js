window.addEventListener('pageshow', (event) => {
    if(event.persisted){
        document.querySelector('main').style.animation = 'slide-in 0.8s forwards';
    }
    document.querySelectorAll('a:not(#hb-more):not(#fb):not(#in):not(#gm):not(#theme), post-card').forEach(element => {
        element.onclick = function(event) {
            event.preventDefault();
            if(this.href != window.location.href){
                window.scrollTo({top: 0, behavior: 'smooth'});
                document.querySelector('main').style.animation = 'slide-out 0.8s forwards';
                document.querySelector('main').addEventListener('animationend', () => {
                    window.location.href = this.href;
                }, {once: true});
            }
        }
    });
    if(window.location.href != window.location.origin + "/free-consultation/"){
        document.getElementById('fb').onclick = function() {
            window.open("https://www.facebook.com/"+"people/"+"Guppao-Marketing/"+"6156256"+"0804983/", '_blank');
        };
        document.getElementById('in').onclick = function() {
            window.open("https://www.linkedin.com/"+"company/"+"guppao-marketing", '_blank');
        };
        document.getElementById('gm').onclick = function() {
            window.open("mailto"+":"+"info"+"@gupp"+"aomar"+"keting"+".com", '_blank');    
        };
    }
    document.getElementById('theme').addEventListener('click', ()=>{
        let theme = document.documentElement.classList.toggle('light')?'light':'dark';
        localStorage.setItem('theme', theme);
    });
});
window.addEventListener('load',()=>{
    ["https://fonts.googleapis.com/css2?family=Arvo:ital,wght@0,400;0,700;1,400;1,700&family=Kanit:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap","https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"].forEach(link=>{
        const link1 = document.createElement("link");
        link1.rel = "stylesheet";
        link1.href = link;
        document.head.appendChild(link1);
    });
    [...document.getElementsByTagName('post-src')].forEach(script=>{
        const script1 = document.createElement("script");
        script1.src = script.getAttribute('src');
        document.body.appendChild(script1);
    });
    document.getElementById("header-logo").src = "/0/img/logo64.webp";
    if(window.location.href != window.location.origin + "/free-consultation/"){
        document.getElementById("footer-logo").src = "/0/img/light120.webp";
        if(window.location.href.includes("/posts/")){
            document.getElementById("blog-post-logo").src = "/0/img/logo64.webp";
        }
    }
});

const saved = localStorage.getItem('theme');
if(saved=='light'||saved==null){document.documentElement.classList.add('light');}

document.addEventListener('readystatechange',()=>{
    [...document.querySelectorAll('link[rel="stylesheet"][media="print"]')].forEach(tag=>{
        tag.media = "all";
    });
});