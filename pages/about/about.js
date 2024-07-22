var link = document.getElementById("self-link");

function smoothscroll(event, to_id){
    event.preventDefault();
    var targetElement = document.getElementById("block-4");
    if (targetElement) {
        var targetPosition = targetElement.offsetTop;
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

link.addEventListener('click', function(event) {smoothscroll(event, 'block-4')});
