function clearHeader(){
    setTimeout(() => {
        var header = document.getElementById('header');
        if(header)
        {
            header.style.backgroundColor = "transparent";
            header.style.borderBottom = "none";
        }
    }, 20);
}

window.addEventListener('load', clearHeader);
