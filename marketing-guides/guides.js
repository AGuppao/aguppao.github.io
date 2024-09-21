const mssg = document.getElementById("mssg"), contact = document.getElementsByClassName('contact-block')[0];

document.querySelector('h-captcha').addEventListener('verified',()=>{
    $.ajax({
        url:"https://docs.google.com/forms/u/0/d/e/1FAIpQLSf8udkmfLEJcKnQdb_y9zFe7_U98fKqP7vYgh8RH47aNkhrUw/formResponse",
        data:new FormData(document.querySelector('form')),processData:false,contentType:false,method:"POST"
    });
    mssg.classList.toggle('visible');
    contact.classList.toggle('visible');        
    mssg.scrollIntoView({behavior: "smooth"});
});