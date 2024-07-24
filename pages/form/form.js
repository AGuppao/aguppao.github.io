var sbmt = document.getElementById("submit");
sbmt.addEventListener('click', submitclicked);

var mssg = document.getElementById("submit-message");
mssg.classList.remove("visible");
mssg.classList.add("hidden");

var email = document.getElementById("email");
email.addEventListener('input', validateemal);

var form = document.getElementsByTagName("form")[0];
form.addEventListener('submit', function(e) {
    e.preventDefault();
});

var pageload;
var startinput = null;
var eachinput = {};
var total = 0;
var mean = 0;
var standardDeviation = 0;
var max = 0;
var min = Infinity;

window.addEventListener('load', function(){
    pageload = new Date().getTime();
});

form.addEventListener('input', function(e) {
    if (!startinput) {
        startinput = new Date().getTime();
    }
});

document.querySelectorAll('form input').forEach(function(field) {
    if(field.name.includes("entry")){
        field.addEventListener('focus', function(e) {
            eachinput[this.name] = {
                start: new Date().getTime(),
                total: eachinput[this.name] ? eachinput[this.name].total : 0
            };
        });
        field.addEventListener('blur', function(e) {
            if (eachinput[this.name]) {
                let endTime = new Date().getTime();
                eachinput[this.name].total += endTime - eachinput[this.name].start;
            }
        });
    }
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
        pageload = new Date().getTime() - pageload;
        startinput = new Date().getTime() - startinput;

        for (let name in eachinput) {
            if (eachinput[name].total > max) {
                max = eachinput[name].total;
            }
            if (eachinput[name].total < min) {
                min = eachinput[name].total;
            }
        }
        for (let name in eachinput) {
            total += eachinput[name].total;
        }
        mean = total / Object.keys(eachinput).length;
        for (let name in eachinput) {
            standardDeviation += Math.pow((eachinput[name].total - mean), 2);
        }
        standardDeviation = Math.sqrt(standardDeviation / Object.keys(eachinput).length);
        sbmt.style.animation = "greenpulse 1.2s ease-out forwards";
        sbmt.disabled = true;
        submitform();
    }
    else{
        sbmt.style.animation = "redpulse 1.2s ease-out";
    }
}

function submitform() {    
    var url = form.getAttribute('url');
    
    if(url) {
        var dat = {};
        let valdom = false;
        let valq = false;

        for (let i = 0; i < form.elements.length; i++) {
            let element = form.elements[i];
            if(element.id === "website")
            {
                valdom = validatedomain(element.value);
            }
            if(element.id === "q1")
            {
                valq = validateq1(element.value);
            }

            if(element.value === ""){
                dat[element.name] = "-";
            }
            else{
                dat[element.name] = element.value;
            }
        }
        
        dat["entry.488020527"] = JSON.stringify({"pageload": pageload, "startinput": startinput, "total": total, "mean": mean, "stdev": standardDeviation, "max": max, "min": min, "domain": valdom, "q1": valq});
        
        // NOTE: emails without the TLD (.com etc) are invalid and will return error 400 Bad Request
        //This does send answers to google form, but runs into CORS errors
        //This checks for status codes 0, 200 and 403
        $.ajax(
            {
                url: url,
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

function validatedomain(domain)
{
    // Domain format: <name>.<TLD>
    var pattern = /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (pattern.test(domain))
    {
        return true;
    }
    else
    {
        return false;
    }
}

function validateq1(response)
{
    if (response.toLowerCase() === "unknown") {
        return false;
    }
    else{
        return true;
    }
}

