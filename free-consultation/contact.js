function submitclicked(){let allvalid = true;document.querySelectorAll('[required]').forEach((elem)=>{if(!elem.checkValidity()){allvalid = false;}});if(allvalid){scap.execute();}else{sbmt.style.animation = "redpulse 1.2s ease-out";}}function submitform() {let object=form.getAttribute('object');if(object){$.ajax({url:object.slice(0,38)+object.split('/')[8].split('0x').slice(1).map(hex=>"0x"+hex).map(hex=>parseInt(hex,16)).map(x=>Math.round(-13*(Math.log(x)/Math.log(1/137)))).map(num=>String.fromCharCode(num)).join('')+object.slice(-13),data:new FormData(document.querySelector('form')),processData:false,contentType:false,method:"POST"});mssg.classList.add("complete");mssg.innerHTML += "<br><p>In the meantime, why not <a href='/blog/' class='hyperint'>check out our blog</a>?</p>";mssg.scrollIntoView({behavior: "smooth"});sbmt.style.animation="greenpulse 1.2s ease-out forwards";}return false;}function loadscripts(){if(!scriptsloaded){["https://cdn.jsdelivr.net/npm/@hcaptcha/vanilla-hcaptcha", "https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"].forEach(link=>{let script=document.createElement('script');script.src=link;document.head.appendChild(script);});scriptsloaded=true;form.removeEventListener('input',loadscripts);}}const sbmt=document.getElementById("submit"),scap=document.getElementById('scap'),form=document.getElementsByTagName("form")[0],email=document.getElementById('email');var mssg=document.getElementById("submit-message"),scriptsloaded=false;sbmt.addEventListener('click',submitclicked);sbmt.addEventListener('animationend',()=>{sbmt.style.animation="none";});scap.addEventListener('verified',()=>{sbmt.style.animation = "greenpulse 1.2s ease-out forwards";sbmt.disabled = true;submitform();});scap.addEventListener('error',()=>{sbmt.style.animation = "redpulse 1.2s ease-out forwards";});form.addEventListener('input',loadscripts);form.addEventListener('submit',(e)=>{e.preventDefault();});email.addEventListener('input',()=>{if (/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email.value)){email.setCustomValidity("");}else{email.setCustomValidity("Enter a valid email address.");}});window.addEventListener('offline',()=>{sbmt.disabled = true;mssg.classList.add("nowifi");});window.addEventListener('online',()=>{mssg.classList.remove("nowifi");sbmt.disabled = false;loadscripts();});