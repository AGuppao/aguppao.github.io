const sbmt=document.getElementById("submit"),form=document.querySelector("form"),email=document.getElementById('email'),scap=document.querySelector("h-captcha");

sbmt.addEventListener('click',()=>{
    let allvalid = true;
    document.querySelectorAll('[required]').forEach((elem)=>{
        if(!elem.checkValidity()){
            allvalid = false;
        }
    });
    if(allvalid){
        scap.execute();
    }
    else{
        sbmt.style.animation = "redpulse 1.2s ease-out";
    }
});
sbmt.addEventListener('animationend',()=>{sbmt.style.animation="none";});
form.addEventListener('submit',(e)=>{e.preventDefault();});
email.addEventListener('input',()=>{
    if (/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email.value)){email.setCustomValidity("");}
    else{email.setCustomValidity("Enter a valid email address.");}
});
scap.addEventListener('verified',()=>{
    sbmt.style.animation = "greenpulse 1.2s ease-out forwards";
    sbmt.disabled = true;
});
scap.addEventListener('error',()=>{
    sbmt.style.animation = "redpulse 1.2s ease-out forwards";
});