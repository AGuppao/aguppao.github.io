function getanonid() {
    let anonid = localStorage.getItem('anonid');
    if (!anonid) {
        anonid = "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c => (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16));
        localStorage.setItem('anonid', anonid);
    }
    return anonid;
};
function getDomPath(el) {
    let nodeName = el.nodeName.toLowerCase();
    if (el === document.body) return 'body';
    if (el.id) nodeName += '#' + el.id;
    else if (el.classList.length) nodeName += '.' + [...el.classList].join('.');
    return getDomPath(el.parentNode) + ' ' + nodeName;
};
function getbrowser(){
    let platform = '';
    ['Android', 'webOS', 'iPhone', 'iPad', 'iPod', 'BlackBerry', 'IEMobile', 'Opera Mini', 'Windows Phone', 'Windows', 'Macintosh', 'Linux', 'X11', 'CrOS', 'Chrome OS'].forEach(function(v) { if((navigator.userAgent.toLowerCase().indexOf(v.toLowerCase()) != -1) && platform == '') platform = v;});
    if(navigator.userAgentData){return {"browser":navigator.userAgentData.brands[navigator.userAgentData.brands.length - 1].brand,"ismobile": navigator.userAgentData.mobile,"platform": platform};}
    else{
        let browsername='';
        let ismobile=/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        if(typeof InstallTrigger!=='undefined'){browsername='firefox';}
        else if(typeof OperaCo!=='undefined'||navigator.userAgent.indexOf('OPR')!==-1){browsername='Opera';}
        else if(typeof browser!=='undefined'){browsername='Microsoft Edge';}
        else if(typeof safari!=='undefined'){browsername='Safari';}
        else if(navigator.brave&&navigator.brave.isBrave){browsername='Brave';}
        else if(browsername==''&&(typeof chrome!=='undefined'||typeof opera!=='undefined'||navigator.userAgent.indexOf('Edg')!==-1)){browsername='Chrome';}
        else{browsername='other';}
        return {"browser":browsername,"ismobile":ismobile,"platform":platform};
    }
};
function pageexit(){
    if(!exitprep){
        exitprep=true;
        let browserdat=getbrowser();
        let data={
            "entry.1671364576":getanonid(),
            "entry.15462849":browserdat.ismobile?'mobile':'desktop',
            "entry.57713871":browserdat.browser,
            "entry.1749644430":browserdat.platform,
            "entry.629299730":window.location.pathname,
            "entry.67676660":document.referrer,
            "entry.1235970925":loadtime,
            "entry.2104982113":domtime,
            "entry.832949539":new Date()-entrytime,
            "entry.1224370506":maxsrcl,
            "entry.2115005109":exitmthd==''?'page hidden':exitmthd,
            "entry.858534344":navigator.webdriver?'bot':''
        };
        let converted=new FormData();
        for (const key of Object.keys(data)){converted.append(key, data[key]);}
        //navigator.sendBeacon("https://docs.google.com/forms/u/0/d/e/1FAIpQLSd1xlycq2fkoCVJ1GjqsTOrtGlgiSOYs0SXD-q10jgn9Gnfzg/formResponse",converted);
    }
};

if(navigator.webdriver&&window.location.pathname!='/404.html'){exitmthd='forced';window.location.href="/404.html";}
var entrytime=new Date(),body_height=document.body.clientHeight,main_height=document.querySelector('main').getBoundingClientRect().height,maxsrcl=0,loadtime=0,domtime=0,exitmthd='',exitprep=false;
document.addEventListener('visibilitychange',()=>{
    if(document.visibilityState=='hidden'){pageexit();}
    else if(document.visibilityState=='visible'){entrytime=new Date();exitprep=false;}
});
window.addEventListener('load',()=>{
    const t = window.performance.timing;
    loadtime = t.loadEventStart - t.fetchStart;
    domtime = t.domContentLoadedEventStart - t.fetchStart;
    document.querySelectorAll('a:not(#hb-more), post-card').forEach(elem =>{elem.addEventListener('click', function(){exitmthd=getDomPath(this).replace('body ','')+' '+this.href;pageexit();});});
    window.addEventListener('scroll',()=>{
        let scrl=window.scrollY;
        let scrlp=100*scrl*(main_height/(body_height*body_height));
        if(scrlp>maxsrcl){maxsrcl=scrlp;}
    });
    if((navigator.userAgent.indexOf("FBAN")>-1)||(navigator.userAgent.indexOf("FBAV")>-1)){
        let link = document.createElement("link");
        link.rel = "stylesheet";
        link.type = "text/css";
        link.href = "/0/css/appwarn.css";
        document.head.appendChild(link);
        let script = document.createElement("script");
        script.src = "/0/js/appwarn.js";
        document.head.appendChild(script);
    }
});