window.addEventListener('DOMContentLoaded', function() {
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
});

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
