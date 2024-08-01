window.addEventListener('DOMContentLoaded', function() {
    const saved = localStorage.getItem('theme');
    if(saved == "dark")
    {
        document.documentElement.classList.add('dark');
        document.getElementById('theme').checked = true;
    }
    else
    {
        document.documentElement.classList.remove('dark');
        document.getElementById('theme').checked = false;
    }
});

document.getElementById('theme').addEventListener('change', changetheme);

function changetheme()
{
    if(document.getElementById('theme').checked)
    {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    }
    else
    {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
    }
}
