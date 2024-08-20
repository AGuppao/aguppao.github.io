const saved = localStorage.getItem('theme');
if(saved == "dark")
{
    changetheme(null, 'dark');
    document.getElementById('theme').checked = true;
}
else
{
    changetheme(null, 'light');
    document.getElementById('theme').checked = false;
}

document.getElementById('theme').addEventListener('change', changetheme);

function changetheme(evnt, theme)
{
    if(!theme){theme = document.getElementById('theme').checked ? 'dark' : 'light';}
    document.documentElement.classList.toggle('dark', theme == 'dark');
    localStorage.setItem('theme', theme);
    var evnt = new CustomEvent('themechanged', { detail: theme });
    window.dispatchEvent(evnt);
}

window.addEventListener('load', () => {    
    document.querySelectorAll('a:not(#hb-more), post-card').forEach(element => {
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
});