(function(){
"use strict";
var WA="21696506693";
var SB_URL="https://kjopscdsnsjkiuajqqdt.supabase.co", SB_KEY="sb_publishable_uQvDKrH3kP_tmrtA7lWpkA_BY_ftDfJ";
var menu=window.YUME_MENU||[];
var byName={}; menu.forEach(function(m){byName[m.n]=m;});
function esc(t){var d=document.createElement('div');d.textContent=t;return d.innerHTML;}
function toast(t){var el=document.getElementById('yToast');if(!el){el=document.createElement('div');el.id='yToast';el.className='toast';document.body.appendChild(el);}el.textContent=t;el.classList.add('show');clearTimeout(el._t);el._t=setTimeout(function(){el.classList.remove('show');},2200);}

/* ---------- scroll progress + parallax ---------- */
var prog=document.getElementById('scrollProg'), ticking=false;
var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
function onScroll(){ if(ticking) return; ticking=true; requestAnimationFrame(function(){
  var h=document.documentElement.scrollHeight-innerHeight; prog.style.transform='scaleX('+(h>0?scrollY/h:0)+')';
  if(!reduce && scrollY<innerHeight*1.2) document.documentElement.style.setProperty('--par',(scrollY*0.25)+'px');
  ticking=false; }); }
addEventListener('scroll',onScroll,{passive:true}); onScroll();

/* ---------- custom cursor + tilt (desktop) ---------- */
if(!matchMedia('(pointer:coarse)').matches && !reduce){
  var cur=document.createElement('div'); cur.className='cur'; document.body.appendChild(cur);
  addEventListener('pointermove',function(e){cur.style.transform='translate('+e.clientX+'px,'+e.clientY+'px)';},{passive:true});
  document.addEventListener('pointerover',function(e){cur.classList.toggle('big',!!e.target.closest('a,button,.card,.xp'));});
  document.querySelectorAll('.tilt').forEach(function(el){
    el.addEventListener('pointermove',function(e){var r=el.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
      el.style.transform='perspective(900px) rotateY('+(x*6)+'deg) rotateX('+(-y*6)+'deg)';});
    el.addEventListener('pointerleave',function(){el.style.transform='';});
  });
}

/* ---------- CART ---------- */
var KEY='yume.cart.v3', cart={};
try{cart=JSON.parse(localStorage.getItem(KEY))||{};}catch(e){}
Object.keys(cart).forEach(function(k){ if(!byName[k]) delete cart[k]; });
function save(){try{localStorage.setItem(KEY,JSON.stringify(cart));}catch(e){} render();}
function count(){return Object.keys(cart).reduce(function(s,k){return s+cart[k];},0);}
function total(){return Object.keys(cart).reduce(function(s,k){return s+cart[k]*byName[k].p;},0);}
function add(n){cart[n]=(cart[n]||0)+1;save();toast('✓ '+n+' ajouté');}
function sub(n){cart[n]=(cart[n]||0)-1;if(cart[n]<=0)delete cart[n];save();}

function decorate(){
  document.querySelectorAll('#mgrid .dish').forEach(function(card){
    var nm=card.querySelector('.nm'); if(!nm) return; var n=nm.textContent;
    var b=card.querySelector('.add-btn');
    if(!b){ b=document.createElement('button'); b.type='button'; b.className='add-btn'; b.addEventListener('click',function(){add(n);}); card.appendChild(b); }
    b.classList.toggle('in-cart',!!cart[n]); b.textContent=cart[n]?('✓ Dans la commande ('+cart[n]+') · + 1'):'+ Ajouter à la commande';
  });
}
var mg=document.getElementById('mgrid'); if(mg) new MutationObserver(decorate).observe(mg,{childList:true});

var fab=document.createElement('button'); fab.type='button'; fab.className='cart-fab'; fab.setAttribute('aria-label','Voir ma commande'); document.body.appendChild(fab);
var wa=document.createElement('a'); wa.className='wa-fab'; wa.href='https://wa.me/'+WA; wa.target='_blank'; wa.rel='noopener'; wa.setAttribute('aria-label','WhatsApp YUME');
wa.innerHTML='<svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.3 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.1-4.5-3.9-4.7-4.1-.1-.2-1.1-1.5-1.1-2.8s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .5l-.3.5-.4.4c-.1.1-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.3 2.4 1.5.3.1.5.1.6-.1l.9-1c.2-.3.4-.2.7-.1l1.9.9c.3.1.5.2.5.3.1.2.1.7-.1 1.3z"/></svg>';
document.body.appendChild(wa);

var dr=document.createElement('div'); dr.className='cdrawer'; dr.setAttribute('role','dialog'); dr.setAttribute('aria-modal','true');
dr.innerHTML='<div class="scrim" data-x></div><div class="panel"><div class="ch"><h3>Ma commande</h3><button data-x aria-label="Fermer">×</button></div><div id="cItems"></div>'+
 '<div id="cForm"><div class="ctot"><span>Total</span><b id="cTot">0 DT</b></div>'+
 '<div class="field"><label>Nom complet</label><input id="cName" maxlength="80" placeholder="Votre nom"></div>'+
 '<div class="field"><label>Téléphone</label><input id="cPhone" type="tel" maxlength="30" placeholder="+216 …"></div>'+
 '<div class="field"><label>Type de commande</label><div class="mode"><button type="button" data-m="table">Sur place</button><button type="button" data-m="pickup">À emporter</button></div></div>'+
 '<div class="field" id="cPickWrap"><label>Heure de retrait</label><input id="cPick" type="time"></div>'+
 '<div class="field"><label>Demande spéciale (optionnel)</label><textarea id="cNote" rows="2" maxlength="300" placeholder="Allergie, sans sucre…"></textarea></div>'+
 '<button class="cta wa-send" id="cSend" type="button">Envoyer la commande sur WhatsApp</button><div class="confirm" id="cMsg"></div></div></div>';
document.body.appendChild(dr);
var $=function(id){return document.getElementById(id);};
var mode=localStorage.getItem('yume.mode')||'table';
$('cName').value=localStorage.getItem('yume.name')||''; $('cPhone').value=localStorage.getItem('yume.phone')||'';
function setMode(m){mode=m;localStorage.setItem('yume.mode',m);dr.querySelectorAll('[data-m]').forEach(function(b){b.classList.toggle('on',b.dataset.m===m);});$('cPickWrap').style.display=m==='pickup'?'':'none';}
dr.querySelectorAll('[data-m]').forEach(function(b){b.addEventListener('click',function(){setMode(b.dataset.m);});}); setMode(mode);
function openC(){dr.classList.add('open');$('cMsg').className='confirm';}
function closeC(){dr.classList.remove('open');}
fab.addEventListener('click',openC); dr.querySelectorAll('[data-x]').forEach(function(x){x.addEventListener('click',closeC);});
document.addEventListener('keydown',function(e){if(e.key==='Escape')closeC();});

function render(){
  var c=count(); fab.classList.toggle('show',c>0); fab.innerHTML='🛒 <span class="n">'+c+'</span> '+total().toFixed(1)+' DT';
  var box=$('cItems'); var keys=Object.keys(cart);
  box.innerHTML=keys.length?'':'<p class="rv-empty">Votre commande est vide. Ajoutez des plats depuis le menu.</p>';
  $('cForm').style.display=keys.length?'':'none';
  keys.forEach(function(n){var m=byName[n];var row=document.createElement('div');row.className='ci';
    row.innerHTML='<img src="'+m.img+'" alt="" width="54" height="54" loading="lazy"><div class="t"><b>'+esc(n)+'</b><span>'+m.p.toFixed(1)+' DT</span></div><div class="qc"><button type="button" data-s aria-label="moins">−</button><span>'+cart[n]+'</span><button type="button" data-a aria-label="plus">+</button></div>';
    row.querySelector('[data-s]').addEventListener('click',function(){sub(n);}); row.querySelector('[data-a]').addEventListener('click',function(){cart[n]++;save();});
    box.appendChild(row);});
  $('cTot').textContent=total().toFixed(1)+' DT';
  decorate();
}
$('cSend').addEventListener('click',function(){
  var msg=$('cMsg'), name=$('cName').value.trim(), phone=$('cPhone').value.trim(), pick=$('cPick').value, note=$('cNote').value.trim();
  function err(t){msg.className='confirm show err';msg.textContent=t;}
  if(!count()) return err('Ajoutez au moins un plat.');
  if(!name||!phone) return err('Merci d\'indiquer votre nom et téléphone.');
  if(mode==='pickup'&&!pick) return err('Choisissez une heure de retrait.');
  localStorage.setItem('yume.name',name); localStorage.setItem('yume.phone',phone);
  var ref='Y'+Date.now().toString(36).slice(-5).toUpperCase(), i=0;
  var lines=Object.keys(cart).map(function(n){i++;return i+'. '+n+' × '+cart[n]+' — '+(cart[n]*byName[n].p).toFixed(1)+' DT';}).join('\n');
  var txt='Bonjour YUME 👋 Nouvelle commande\n\nRéf : '+ref+'\nDate : '+new Date().toLocaleString('fr-FR')+'\n\nClient : '+name+'\nTéléphone : '+phone+'\nType : '+(mode==='pickup'?'À emporter — retrait à '+pick:'Sur place')+
    '\n\nArticles :\n'+lines+'\n\nTOTAL : '+total().toFixed(1)+' DT'+(note?'\n\nDemande spéciale : '+note:'')+'\n\nMerci de confirmer ma commande.';
  window.open('https://wa.me/'+WA+'?text='+encodeURIComponent(txt),'_blank');
  cart={}; save(); $('cNote').value='';
  $('cForm').style.display=''; msg.className='confirm show'; msg.textContent='Merci ✦ Votre reçu (réf. '+ref+') a été envoyé sur WhatsApp. YUME confirme très vite.';
});
render();

/* ---------- REVIEWS ---------- */
var stars=$('rvStars'), rating=5;
if(stars){
  for(var s=1;s<=5;s++){(function(v){var b=document.createElement('button');b.type='button';b.textContent='★';b.setAttribute('aria-label',v+' étoiles');b.addEventListener('click',function(){rating=v;paint();});stars.appendChild(b);})(s);}
  function paint(){stars.querySelectorAll('button').forEach(function(b,i){b.classList.toggle('on',i<rating);});} paint();
  $('rvText').addEventListener('input',function(){$('rvCount').textContent=this.value.length+'/300';});
  var H={apikey:SB_KEY,Authorization:'Bearer '+SB_KEY,'Content-Type':'application/json'};
  function load(){
    fetch(SB_URL+'/rest/v1/reviews?select=name,rating,comment,created_at&order=created_at.desc&limit=12',{headers:H})
    .then(function(r){if(!r.ok)throw 0;return r.json();}).then(function(rows){
      var l=$('rvList'); if(!rows.length){l.innerHTML='<p class="rv-empty">Soyez le premier à laisser un avis ✦</p>';return;}
      l.innerHTML=rows.map(function(r){return '<div class="rv card"><div class="s">'+'★'.repeat(r.rating)+'<span style="opacity:.25">'+'★'.repeat(5-r.rating)+'</span></div><p>'+esc(r.comment)+'</p><small><b>'+esc(r.name)+'</b> · '+new Date(r.created_at).toLocaleDateString('fr-FR')+'</small></div>';}).join('');
    }).catch(function(){$('rvList').innerHTML='<p class="rv-empty">Impossible de charger les avis pour le moment.</p>';});
  }
  load();
  $('rvForm').addEventListener('submit',function(e){e.preventDefault();
    var m=$('rvMsg'), name=$('rvName').value.trim(), comment=$('rvText').value.trim();
    if(!name||!comment){m.className='confirm show err';m.textContent='Merci de remplir votre nom et votre avis.';return;}
    var btn=this.querySelector('button[type=submit]'); btn.disabled=true;
    fetch(SB_URL+'/rest/v1/reviews',{method:'POST',headers:Object.assign({Prefer:'return=minimal'},H),body:JSON.stringify({name:name.slice(0,80),rating:rating,comment:comment.slice(0,300)})})
    .then(function(r){if(!r.ok)throw 0; m.className='confirm show'; m.textContent='Merci '+name+' ✦ Votre avis est publié.'; $('rvForm').reset(); $('rvCount').textContent='0/300'; rating=5; paint(); load();})
    .catch(function(){m.className='confirm show err';m.textContent='Envoi impossible, réessayez dans un instant.';})
    .finally(function(){btn.disabled=false;});
  });
}
/* reveal for newly added sections (main observer ran before) */
var io2=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io2.unobserve(e.target);}});},{threshold:.12});
document.querySelectorAll('.reveal:not(.in)').forEach(function(el){io2.observe(el);});
})();
