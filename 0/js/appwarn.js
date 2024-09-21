var icon=document.createElement('i'),msg=document.createElement('p');
icon.classList.add('fa', 'fa-warning');
icon.id='appwarn-icon';
msg.id='appwarn-msg';
msg.innerHTML=`
<h2>Website not Displaying Properly?</h2>
<p>Facebook's in-app browser doesn't properly display parts of this website. Please try:</p>
<ul>
    <li>Clicking the three dots in the top right corner</li>
    <li>Then select 'Open in External Browser'</li>
</ul>
`;
document.body.appendChild(icon);
document.body.appendChild(msg);