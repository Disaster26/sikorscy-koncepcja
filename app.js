(function(){
var d=document,top=d.getElementById('top'),bur=d.getElementById('burger'),menu=d.getElementById('menu');
var CK=d.body.getAttribute('data-ck')||'lux-c';
bur.addEventListener('click',function(){var o=top.classList.toggle('open');bur.setAttribute('aria-expanded',o);bur.setAttribute('aria-label',o?'Zamknij menu':'Otwórz menu')});
menu.addEventListener('click',function(e){if(e.target.tagName==='A'){top.classList.remove('open');bur.setAttribute('aria-expanded','false')}});
var sc=function(){top.classList.toggle("sc",scrollY>8)};addEventListener("scroll",sc,{passive:true});requestAnimationFrame(function(){requestAnimationFrame(sc)});
/* aktywna pozycja menu */
var links=[].slice.call(menu.querySelectorAll('a[href^="#"]'));
if('IntersectionObserver' in window){
 var io=new IntersectionObserver(function(en){en.forEach(function(x){if(x.isIntersecting){links.forEach(function(a){a.classList.toggle('on',a.getAttribute('href')==='#'+x.target.id)})}})},{rootMargin:'-45% 0px -50% 0px'});
 links.forEach(function(a){var s=d.querySelector(a.getAttribute('href'));if(s)io.observe(s)});
 /* pasek mobilny po minieciu pierwszego ekranu */
 var mob=d.getElementById('mob'),hero=d.querySelector('.hero');
 if(mob&&hero)new IntersectionObserver(function(en){mob.classList.toggle('widac',!en[0].isIntersecting)},{threshold:0}).observe(hero);
}
/* pasy zdjec: strzalki + przeciaganie mysza */
[].forEach.call(d.querySelectorAll('[data-pas]'),function(p){
 var t=p.querySelector('.tor');
 [].forEach.call(p.querySelectorAll('.strzalki button'),function(b){b.addEventListener('click',function(){var f=t.querySelector('figure');t.scrollBy({left:(+b.dataset.k)*(f.offsetWidth+16),behavior:'smooth'})})});
 var x0,s0,moved=false,down=false;
 t.addEventListener('pointerdown',function(e){if(e.pointerType!=='mouse')return;down=true;moved=false;x0=e.clientX;s0=t.scrollLeft});
 addEventListener('pointermove',function(e){if(!down)return;var dx=e.clientX-x0;if(Math.abs(dx)>5){moved=true;t.classList.add('drag')}if(moved)t.scrollLeft=s0-dx});
 addEventListener('pointerup',function(){if(!down)return;down=false;if(moved){t.classList.remove('drag');var f=t.querySelector('figure'),w=f.offsetWidth+16;t.scrollTo({left:Math.round(t.scrollLeft/w)*w,behavior:'smooth'})}});
 t.addEventListener('click',function(e){if(moved){e.preventDefault();e.stopPropagation();moved=false}},true);
});
/* lightbox */
var lb=d.getElementById('lb');
if(lb){var li=lb.querySelector('img'),grp=[],i=0;
 var big=function(img){var s=img.getAttribute('srcset');if(!s)return img.src;var p=s.split(',').map(function(x){return x.trim().split(' ')[0]});return p[p.length-1]};
 var show=function(){li.src=big(grp[i]);li.alt=grp[i].alt};
 [].forEach.call(d.querySelectorAll('[data-g]'),function(b){b.addEventListener('click',function(){var g=b.dataset.g;grp=[].map.call(d.querySelectorAll('[data-g="'+g+'"]'),function(x){return x.querySelector('img')||x.parentNode.querySelector('img')});var me=b.querySelector('img')||b.parentNode.querySelector('img');i=grp.indexOf(me);show();lb.classList.add('on');lb.querySelector('.x').focus()})});
 var close=function(){lb.classList.remove('on');li.removeAttribute('src')};
 lb.querySelector('.x').onclick=close;lb.querySelector('.p').onclick=function(){i=(i-1+grp.length)%grp.length;show()};lb.querySelector('.n').onclick=function(){i=(i+1)%grp.length;show()};
 lb.addEventListener('click',function(e){if(e.target===lb)close()});
 addEventListener('keydown',function(e){if(!lb.classList.contains('on'))return;if(e.key==='Escape')close();if(e.key==='ArrowLeft')lb.querySelector('.p').click();if(e.key==='ArrowRight')lb.querySelector('.n').click()});
 var sx=null;lb.addEventListener('touchstart',function(e){sx=e.touches[0].clientX},{passive:true});lb.addEventListener('touchend',function(e){if(sx===null)return;var dx=e.changedTouches[0].clientX-sx;if(Math.abs(dx)>50)(dx<0?lb.querySelector('.n'):lb.querySelector('.p')).click();sx=null});
}
/* cookies + mapa */
var ck=d.getElementById('cookies'),mapa=d.getElementById('mapa');
var zgoda=function(){try{return localStorage.getItem(CK)==='1'}catch(e){return false}};
var loadMap=function(){if(!mapa||mapa.dataset.ok||!zgoda())return;var go=function(){if(mapa.dataset.ok)return;mapa.dataset.ok=1;var f=d.createElement('iframe');f.src=mapa.dataset.src;f.title='Mapa dojazdu';f.loading='lazy';f.referrerPolicy='no-referrer-when-downgrade';mapa.innerHTML='';mapa.appendChild(f)};
 if('IntersectionObserver' in window){var o=new IntersectionObserver(function(en){if(en[0].isIntersecting){go();o.disconnect()}},{rootMargin:'300px'});o.observe(mapa)}else go()};
if(ck)ck.addEventListener('click',function(e){var c=e.target.dataset.c;if(c===undefined)return;try{localStorage.setItem(CK,c)}catch(x){}ck.hidden=true;loadMap()});
loadMap();
/* formularz pokazowy */
var f=d.getElementById('form');if(f)f.addEventListener('submit',function(e){e.preventDefault();var s=d.getElementById('finfo');s.textContent='Dziękujemy. To podgląd strony, więc zapytanie nie zostało wysłane.';s.style.fontWeight='700'});
})();
