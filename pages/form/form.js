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
});

const mssg = document.getElementById("submit-message");
mssg.classList.remove("visible");
mssg.classList.add("hidden");

const email = document.getElementById("email");
email.addEventListener('input', validateemal);

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
    }
}

function submitform() {    
    var object = get(form.getAttribute('object'));
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
        
        // NOTE: emails without the TLD (.com etc) are invalid and will return error 400 Bad Request
        //This does send answers to google form, but runs into CORS errors
        //This checks for status codes 0, 200 and 403
        $.ajax(
            {
                url: object,
                data:  dat,
                type: "POST",
                dataType: "json",
                crossDomain: true,
                statusCode: {
                    0: function() {
                        //CORS error - form still went through -this is always being called
                        sbmt.style.animation = "none";
                        mssg.classList.add("visible");
                        sbmt.style.animation = "greenpulse 1.2s ease-out forwards";
                        
                        //wait until the animation is done, then return home
                        setTimeout(() => {
                            window.location.href = "/index.html";
                        }, 3600); //not an ideal way of doing this
                    },
                    200: function() {
                        //success
                        sbmt.style.animation = "none";
                        mssg.classList.add("visible");
                        sbmt.style.animation = "greenpulse 1.2s ease-out forwards";
                        
                        //wait until the animation is done, then return home
                        setTimeout(() => {
                            window.location.href = "/index.html";
                        }, 3600);
                    },
                    403: function() {
                        //request refused
                        sbmt.style.animation = "none";
                        mssg.innerHTML = "There was an issue with the submission <br> Please email <a href=\"mailto:\">us</a> instead. <br> Sorry about that.";
                        mssg.classList.add("visible");
                        sbmt.style.animation = "redpulse 1.2s ease-out";
                    }
                }
            }
        );
    }
    return false;
}

function validateemal() 
{
    // public domain format: <name>@<company>.<TLD>
    var pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (pattern.test(email.value))
    {
        email.setCustomValidity("");
    }
    else
    {
        email.setCustomValidity("Enter a valid email address.");
    }
}

function get(str)
{
    let arr = str.split('0x').slice(1);
    arr = arr.map(hex => "0x" + hex);
    arr = arr.map(hex => parseInt(hex, 16));
    const f = (x) => Math.round(-13 *(Math.log(x) / Math.log(1/137)));
    arr = arr.map(f);
    arr = arr.map(num => String.fromCharCode(num)).join('');
    return arr;
}
