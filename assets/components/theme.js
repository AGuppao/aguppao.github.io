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
    if(!theme)
    {
        theme = document.getElementById('theme').checked ? 'dark' : 'light';
    }
    document.documentElement.classList.toggle('dark', theme == 'dark');
    localStorage.setItem('theme', theme);

    var evnt = new CustomEvent('themechanged', { detail: theme });
    window.dispatchEvent(evnt);
}

window.addEventListener('DOMContentLoaded', () => {
    var scrl = sessionStorage.getItem('scrollY');

    if (scrl){
        window.scroll(0, scrl);
        window.scrollTo({top: 0, behavior: 'smooth'});
    }
})

window.addEventListener('beforeunload', () => {
    sessionStorage.setItem('scrollY', window.scrollY);
})

window.addEventListener('load', () => {    
    document.querySelectorAll('a:not(#hb-more)').forEach(element => {
        element.onclick = function(event) {
            event.preventDefault();
            
            if(this.href != window.location.href){
                document.querySelectorAll('body > :not(header):not(footer):not(script)').forEach(element => {
                    element.style.animation = 'slide-out 0.6s forwards';
                });
        
                setTimeout(() => {
                    window.location.href = this.href;  
                }, 500);   
            }
        }
    });
});
