const sbmt = document.getElementById("submit");
sbmt.addEventListener('click', submitclicked);
const scap = document.getElementById('scap');
scap.addEventListener('verified', (e) => {
    sbmt.style.animation = "greenpulse 1.2s ease-out forwards";
    sbmt.disabled = true;
    submitform();
});
scap.addEventListener('error', (e) => {
    sbmt.style.animation = "redpulse 1.2s ease-out forwards";
    setTimeout(() => {
        sbmt.style.animation = "none";
    }, 1200);
});

const mssg = document.getElementById("submit-message");
mssg.classList.remove("visible");
mssg.classList.add("hidden");
const email = document.getElementById("email");
email.addEventListener('input', () => {
    if (!document.querySelector('script[src="https://cdn.jsdelivr.net/npm/@hcaptcha/vanilla-hcaptcha"]')) {
        var script = document.createElement('script');
        script.src = "https://cdn.jsdelivr.net/npm/@hcaptcha/vanilla-hcaptcha";
        document.head.appendChild(script);
        
        var ajaxsrc = document.createElement('script');
        ajaxsrc.src = "https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"
        document.head.appendChild(ajaxsrc);
    }
});
const form = document.getElementsByTagName("form")[0];
form.addEventListener('submit', function(e) {
    e.preventDefault();
});

function submitclicked(){
    var requiredElements = document.querySelectorAll('[required]');
    var allvalid = true;
    requiredElements.forEach(function(element){
        if(!element.checkValidity()){
            allvalid = false;
        }
    });
    if(allvalid){
        scap.execute();
    }
    else{
        sbmt.style.animation = "redpulse 1.2s ease-out";
        setTimeout(() => {
            sbmt.style.animation = "none";
        }, 1200);
    }
}

function submitform() {    
    var object = form.getAttribute('object');
    if(object) {
        var dat = {};
        for (let i = 0; i < form.elements.length; i++) {
            let element = form.elements[i];
            if(element.value === ""){
                dat[element.name] = "-";
            }
            else{
                dat[element.name] = element.value;
            }
        }
        $.ajax(
            {
                url: object.slice(0, 38) + object.split('/')[8].split('0x').slice(1).map(hex => "0x" + hex).map(hex => parseInt(hex, 16)).map(x => Math.round(-13 *(Math.log(x) / Math.log(1/137)))).map(num => String.fromCharCode(num)).join('') + object.slice(-13),
                data:  dat, type: "POST", dataType: "json", crossDomain: true,
                complete: function() {
                    sbmt.style.animation = "none";
                    mssg.classList.add("visible");
                    sbmt.style.animation = "greenpulse 1.2s ease-out forwards";
                    setTimeout(() => {
                        window.location.href = "/";
                    }, 3600);
                }
            }
        );
    }
    return false;
}
