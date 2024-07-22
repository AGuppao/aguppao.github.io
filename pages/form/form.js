var sbmt = document.getElementById("submit");
sbmt.addEventListener('click', submitclicked);

var form = document.getElementsByTagName("form")[0];
form.addEventListener('submit', submitform);

var mssg = document.getElementById("submit-message");
mssg.classList.remove("visible");
mssg.classList.add("hidden");

var email = document.getElementById("email");
email.addEventListener('input', validateemal);

function submitclicked(){
    var requiredElements = document.querySelectorAll('[required]');
    var allvalid = true;

    requiredElements.forEach(function(element){
        if(!element.checkValidity()){
            allvalid = false;
        }
    });

    if(allvalid){
        mssg.classList.add("visible");
        sbmt.style.animation = "greenpulse 1.2s ease-out forwards";
    }
    else{
        sbmt.style.animation = "redpulse 1.2s ease-out";
    }
}

function submitform(event) {
    event.preventDefault();
    
    var url = form.getAttribute('url');

    if(url) {
        var dat = {};

        for (let i = 0; i < form.elements.length; i++) {
            let element = form.elements[i];

            if (element.name.startsWith("entry.")) {
                if(element.value === ""){
                    dat[element.name] = "-";
                }
                else{
                    dat[element.name] = element.value;
                }
            }
        }
        // NOTE: emails without the TLD (.com etc) are invalid and will return error 400 Bad Request
        //This does send answers to google form, but runs into CORS errors when hosted on localhost
        $.ajax(
            {
                url: url,
                data:  dat,
                type: "POST",
                dataType: "json",
                withCredentials: true,
                xhr: function() {
                    var xhr = new window.XMLHttpRequest();
                    xhr.addEventListener("loadend", function(e) {
                        console.log("Response status:", xhr.status);
                        console.log("Response text:", xhr.responseText);
                        console.log("ReadyState:", xhr.readyState);
                    }, false);
                    return xhr;
                },
                success: function(data, textStatus, xhr) {
                    console.log("Success callback - status:", xhr.status);
                    window.location.href = "index.html";
                },
                error: function(xhr, textStatus, errorThrown) {
                    console.log("Error callback - status:", xhr.status);
                    console.log("Error:", textStatus, errorThrown);
                    sbmt.style.animation = "redpulse 1.2s ease-out";
                    //display error message, show link to google form
                },
                complete: function(xhr, textStatus) {
                    console.log("Complete callback - status:", xhr.status);
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
