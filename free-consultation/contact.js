var mssg=document.getElementById("submit-message"),header=document.querySelector('header'),navdown=document.getElementById('navdown');
document.querySelector('h-captcha').addEventListener('verified',()=>{
    $.ajax({
        url:"https://docs.google.com/forms/u/0/d/e/1FAIpQLSdJweBSYVRe8vSN0dy8XPIatKlleGIPGX0UDqiYN3tD09gVqA/formResponse",
        data:new FormData(document.querySelector('form')),processData:false,contentType:false,method:"POST"
    });
    mssg.classList.add("complete");
    mssg.innerHTML += "<br><p>In the meantime, why not <a href='/blog/' class='hyperint'>check out our blog</a>?</p>";
    mssg.scrollIntoView({behavior: "smooth"});
});
window.addEventListener('offline',()=>{
    sbmt.disabled = true;
    mssg.classList.add("nowifi");
});
window.addEventListener('online',()=>{
    mssg.classList.remove("nowifi");
    sbmt.disabled = false;
});
header.style.position='relative';
navdown.style.position='fixed';
navdown.style.width="75%";