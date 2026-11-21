'use strict';
const $=(s,r=document)=>r.querySelector(s), app=$('#app');
const LS=(k,d)=>{try{const v=JSON.parse(localStorage.getItem('sh_'+k));return v??d}catch{return d}};
const SV=(k,v)=>{try{localStorage.setItem('sh_'+k,JSON.stringify(v))}catch{}};
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const SC=(t)=>`<div class="scudo"><span class="av">${MASCOT}</span><div><b>SCUDO</b>${t}</div></div>`;

/* ===== DATI: modifica qui contenuti, video (yt = ID YouTube oppure file "video/nome.mp4"), quiz ===== */
const LOGO='<svg viewBox="0 0 120 110" width="64" height="58"><defs><linearGradient id="lg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fde047"/><stop offset=".5" stop-color="#fb923c"/><stop offset="1" stop-color="#c2410c"/></linearGradient><linearGradient id="lt" x1="0" x2="1"><stop offset="0" stop-color="#2dd4bf"/><stop offset="1" stop-color="#38bdf8"/></linearGradient></defs><path d="M60 52C48 40 30 36 6 38c6 14 20 26 40 28z" fill="url(#lg)"/><path d="M60 52C72 40 90 36 114 38c-6 14-20 26-40 28z" fill="url(#lg)"/><path d="M60 8 92 20v30c0 24-14 42-32 52C42 92 28 74 28 50V20z" fill="url(#lg)"/><path d="M60 16 85 25v25c0 19-10 33-25 42C45 83 35 69 35 50V25z" fill="#0b1020"/><path d="M60 26c-9 0-16 7-16 16v10h32V42c0-9-7-16-16-16z" fill="url(#lt)"/><rect x="48" y="40" width="24" height="6" rx="3" fill="#0b1020"/><path d="m50 68 7 7 14-15" stroke="#fb923c" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const MASCOT='<svg viewBox="0 0 100 100"><defs><linearGradient id="mg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fdba74"/><stop offset="1" stop-color="#ea580c"/></linearGradient></defs><path d="M50 6 88 20v28c0 24-16 40-38 48C28 88 12 72 12 48V20z" fill="url(#mg)"/><rect x="24" y="34" width="52" height="18" rx="9" fill="#0b1020"/><circle cx="40" cy="43" r="4" fill="#2dd4bf"/><circle cx="60" cy="43" r="4" fill="#2dd4bf"/><path d="m38 66 8 8 16-17" stroke="#fff" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const PAGES=[['home','🏠','HOME'],['impara','📖','IMPARA'],['quiz','📝','QUIZ'],['giochi','🎮','GIOCHI'],['forum','👥','FORUM'],['podcast','🎙️','PODCAST'],['scanner','✨','AI SCANNER'],['sos','🚨','EMERGENZA']];
const TOPICS=[
{id:'virus',cat:'Virus & Malware',title:'Virus, malware e attacchi informatici',desc:'Cosa sono i virus informatici, come arrivano sul tuo dispositivo e come bloccarli.',yt:'',q:'virus malware per ragazzi spiegazione',
 tips:['Installa app solo dagli store ufficiali (App Store o Play Store).','Aggiorna il telefono o il computer ogni volta che te lo chiede: chiude le porte ai virus.','Non aprire allegati o link di chi non conosci, nemmeno se sembrano divertenti.','Se il dispositivo diventa strano, spegni tutto e avvisa subito un adulto.'],
 quiz:{t:'Il tuo scudo contro i virus',qs:[['Dove è più sicuro scaricare le app?',['Da siti sconosciuti','Dagli store ufficiali','Da link ricevuti in chat','Da pop-up'],1],['Perché si aggiornano i dispositivi?',['Per cambiare colore','Per chiudere falle di sicurezza','Per consumare batteria','Non serve'],1],['Ricevi un allegato da uno sconosciuto. Cosa fai?',['Lo apro subito','Lo giro agli amici','Non lo apro e lo cancello','Lo scarico per sicurezza'],2],['Il telefono diventa lentissimo e apre pubblicità da solo. Cosa fai?',['Ignoro','Avviso un adulto e lo controlliamo','Scarico altre app','Condivido la password'],1]]}},
{id:'profili',cat:'Profili falsi',title:'Profili falsi e chi si nasconde online',desc:'Come riconoscere account finti e perché non fidarti di chi non conosci davvero.',yt:'',q:'profili falsi social ragazzi come riconoscerli',
 tips:['Un profilo nuovo, con poche foto e tanti messaggi insistenti è sospetto.','Non dare mai indirizzo, scuola o foto private a chi conosci solo online.','Cerca la foto con la ricerca immagini: spesso è rubata.','Se qualcuno ti mette a disagio, blocca, segnala e parlane con un adulto.'],
 quiz:{t:'Smaschera i profili falsi',qs:[['Un “coetaneo” mai visto ti chiede dove abiti. Cosa fai?',['Glielo dico','Non rispondo, blocco e avviso un adulto','Do solo la via','Gli chiedo una foto'],1],['Quale segnale può indicare un profilo falso?',['Account nuovo con foto perfette e richieste strane','Molti amici in comune reali','Parla della scuola','Pubblica foto vere con te'],0],['Come verifichi una foto profilo?',['Non si può','Ricerca per immagine','Chiedo la password','Guardo i like'],1],['Chi ti spinge a tenere segreti con un adulto è…',['Un amico speciale','Un campanello d’allarme: parlane subito','Normale','Da accontentare'],1]]}},
{id:'truffe',cat:'Truffe & Phishing',title:'Truffe e phishing: non abboccare',desc:'Messaggi e siti che rubano password e dati: impara a riconoscerli.',yt:'',q:'phishing truffe online ragazzi',
 tips:['Nessun sito serio ti chiede la password via link o messaggio.','Premi gratuiti e urgenza (“ultime 2 ore!”) sono tipici delle truffe.','Controlla l’indirizzo del sito: lettere strane o troppi trattini sono un allarme.','Se hai cliccato, cambia password e dillo a un adulto.'],
 quiz:{t:'Anti-truffa: mettiti alla prova',qs:[['Un sito dice che il tuo account di gioco è bloccato e chiede la password. Cosa fai?',['La inserisco','Chiudo e apro il gioco dall’app ufficiale','La dò a un amico','Rispondo al messaggio'],1],['“Hai vinto un iPhone! Clicca ora!” È…',['Fortuna','Quasi sicuramente una truffa','Un regalo','Una gara vera'],1],['Quale indirizzo è sospetto?',['https://www.google.com','http://g00gle-premio-gratis.xyz/login','https://scuola.it','https://wikipedia.org'],1],['Hai cliccato un link strano e inserito la password. Cosa fai?',['Niente','Cambio password e avviso un adulto','Cancello l’app','Aspetto'],1]]}},
{id:'ia',cat:'Contenuti IA',title:'Immagini e video creati dall’IA',desc:'Deepfake e foto false: come capire cosa è reale e cosa no.',yt:'',q:'riconoscere immagini create con intelligenza artificiale',
 tips:['Controlla mani, denti, orecchie e testi nelle immagini: l’IA sbaglia spesso lì.','Se una notizia è incredibile, cercala su fonti affidabili prima di condividerla.','I video “troppo perfetti” o con voci strane possono essere deepfake.','Non condividere mai foto di altri senza permesso, nemmeno modificate.'],
 quiz:{t:'Reale o creato dall’IA?',qs:[['Dove l’IA sbaglia spesso?',['Mani e dita','Colori','Cielo','Nulla'],0],['Vedi una notizia incredibile. Cosa fai?',['Condivido subito','Verifico su fonti affidabili','Credo ai commenti','Metto like'],1],['Un deepfake è…',['Un video falso realistico fatto con IA','Un gioco','Un antivirus','Un filtro'],0],['Posso modificare con IA la foto di un compagno e postarla?',['Sì, è uno scherzo','No, serve il suo permesso e può far male','Sì se è divertente','Solo il lunedì'],1]]}}];
const EPS=[['Ciao, futuro CyberEroe!','La presentazione: chi è Scudo e cosa faremo insieme in questo podcast.','Ciao, futuro CyberEroe! Io sono Scudo, il tuo scudo digitale. In questo podcast ti racconterò storie, trucchi e consigli per difenderti online. Pronto a diventare un vero cyber eroe? Iniziamo!'],
['Virus e malware: i nemici invisibili','Come si nasconde un virus nel telefono e come tenerlo lontano.','I virus sono programmi cattivi che si nascondono in app false, allegati e link strani. Per tenerli lontani scarica app solo dagli store ufficiali, aggiorna sempre il telefono e non aprire nulla da sconosciuti. Se il telefono fa cose strane, spegnilo e avvisa un adulto.'],
['Profili falsi: chi c’è dietro lo schermo?','Come riconoscere chi finge di essere un altro.','Online chiunque può fingere di essere un ragazzino come te. Diffida di chi chiede foto, indirizzo o segreti. Cerca la foto con la ricerca immagini, e se ti senti a disagio, blocca, segnala e parlane con un adulto di fiducia.'],
['Truffe e phishing','Messaggi trappola che rubano password.','Un messaggio dice che il tuo account è bloccato e vuole la password? È phishing! Non cliccare. Apri l’app ufficiale da solo e controlla lì. Premi gratis e urgenza sono i segnali classici della truffa.'],
['Reale o creato dall’IA?','Foto e video falsi: come non farti ingannare.','Oggi l’intelligenza artificiale crea immagini molto realistiche. Guarda mani, testi e sfondi: spesso ci sono errori. E prima di condividere una notizia, controlla sempre che sia vera.']];
const FORUM0=[{id:1,cat:'Truffe & Phishing',d:'16 ottobre 2026',t:'Un link mi ha chiesto la password del gioco online',b:'Stavo giocando e un sito mi ha detto che il mio account era bloccato e mi ha chiesto la password per sbloccarlo. Non l’ho data e ho chiuso la pagina. Ho fatto bene?',a:'Luca13',r:['Hai fatto benissimo! Nessun gioco chiede la password così.','Controlla comunque l’account dall’app ufficiale.']},
{id:2,cat:'Altro',d:'16 ottobre 2026',t:'Come faccio a capire se una foto è fatta con l’IA?',b:'Sul web ho visto foto fantastiche ma strane. C’è un modo per capirlo?',a:'Giulia12',r:['Guarda mani e testi, sono i punti dove sbaglia di più. Prova anche lo scanner di Shieldo!']}];
const CATS=['Virus & Malware','Profili falsi','Truffe & Phishing','Password & Privacy','Altro'];

/* ===== ROUTER ===== */
$('#nav').innerHTML=PAGES.map(p=>`<a href="#${p[0]}" data-p="${p[0]}"><span class="nt">${p[1]}</span>${p[2]}</a>`).join('');
$('.brand').innerHTML=LOGO+'<span>SHIELDO</span>';
$('#burger').onclick=()=>$('#side').classList.toggle('open');
let stopFn=null;
function route(){
 if(stopFn){stopFn();stopFn=null} speechSynthesis.cancel();
 const [p,arg]=(location.hash.slice(1)||'home').split('/');
 $('#side').classList.remove('open');
 document.querySelectorAll('#nav a').forEach(a=>a.classList.toggle('on',a.dataset.p===p||(p==='certificato'&&a.dataset.p==='quiz')));
 const R={home,impara,quiz,giochi,forum,podcast,scanner,certificato,sos};(R[p]||home)(arg);
 scrollTo(0,0);
}
addEventListener('hashchange',route);

/* ===== HOME ===== */
function home(){app.innerHTML=`<section class="hero"><div><span class="pill">👋 CIAO, FUTURO CYBEREROE!</span><h1>Costruisci il tuo <span class="hl">scudo</span> digitale</h1><p class="sub">Shieldo ti insegna a riconoscere virus, profili falsi, truffe e contenuti creati dall'intelligenza artificiale. Impara, gioca, fai il quiz e ricevi il tuo certificato.</p><a class="btn" href="#impara">INIZIA A IMPARARE →</a><a class="btn g" href="#scanner">✨ AI SCANNER</a><button class="btn" id="inst" style="display:none">⬇ SCARICA APP</button></div><div class="mascot">${MASCOT}</div></section>
<h2>Cosa trovi</h2><div class="grid">${PAGES.slice(1).map(p=>`<a class="card" href="#${p[0]}" style="text-decoration:none;color:inherit"><div class="ico">${p[1]}</div><h3>${p[2]}</h3></a>`).join('')}</div>`;
 const b=$('#inst'); b.style.display='inline-block';
 b.onclick=async()=>{if(window._dp){_dp.prompt();_dp=null}else alert('Per installare l’app: dal menu del browser scegli “Aggiungi a schermata Home” / “Installa app”.')}}
addEventListener('beforeinstallprompt',e=>{e.preventDefault();window._dp=e});

/* ===== IMPARA (video: modifica videos.json su GitHub, oppure aggiungili dal sito) ===== */
let VJ=[];fetch('videos.json').then(r=>r.json()).then(j=>{VJ=j;if(location.hash.startsWith('#impara'))route()}).catch(()=>{});
const ytid=u=>{const m=(u||'').match(/(?:youtu\.be\/|[?&]v=|embed\/|shorts\/)([\w-]{11})/);return m?m[1]:(/^[\w-]{11}$/.test(u||'')?u:null)};
const allV=()=>[...TOPICS.map(t=>({...t,url:LS('vid_'+t.id,'')||(VJ.find(v=>v.topic===t.id)||{}).url||t.yt})),...VJ.filter(v=>!v.topic).map((v,i)=>({id:'x'+i,cat:v.cat||'Video',title:v.title,desc:v.desc||'',url:v.url,tips:v.tips||[],extra:1})),...LS('myv',[]).map((v,i)=>({id:'m'+i,cat:'I tuoi video',title:v.title,desc:'Aggiunto da te',url:v.url,tips:[],extra:1,mine:1}))];
function player(u){if(!u)return'<div class="card"><p>Nessun video collegato: incolla un link qui sotto.</p></div>';const y=ytid(u);
 return y?`<iframe class="vid" src="https://www.youtube-nocookie.com/embed/${y}" allow="encrypted-media;picture-in-picture;fullscreen" allowfullscreen></iframe>`:`<video class="vid" controls playsinline src="${esc(u)}"></video>`}
function impara(id){
 const V=allV();
 if(!id){app.innerHTML=`<h1>IMPARA</h1><p class="sub">Scegli un video: guarda, leggi i consigli di Shieldo e poi metti alla prova ciò che hai imparato.</p>${SC('Ogni video ti dà un superpotere contro i pericoli del web.')}<div class="grid">${V.map(t=>{const y=ytid(t.url);return`<a class="card vc" href="#impara/${t.id}"><div class="thumb" ${y?`style="background-image:url(https://i.ytimg.com/vi/${y}/hqdefault.jpg)"`:''}><i>▶</i></div><span class="tag">${t.cat}</span><h3>${esc(t.title)}</h3><p>${esc(t.desc)}</p></a>`}).join('')}</div><h2>＋ Aggiungi un video</h2><div class="card"><p>Incolla il titolo e il link (YouTube oppure un file .mp4, anche da GitHub).</p><input id="at" placeholder="Titolo del video" maxlength="80"><input id="au" placeholder="https://..."><button class="btn" id="ab">AGGIUNGI VIDEO</button></div>`;
  $('#ab').onclick=()=>{const t=$('#at').value.trim(),u=$('#au').value.trim();if(!t||!u)return alert('Scrivi titolo e link.');const l=LS('myv',[]);l.push({title:t,url:u});SV('myv',l);impara()};return}
 const t=V.find(x=>x.id===id)||V[0],url=t.url;
 app.innerHTML=`<a href="#impara" class="back">← Tutti i video</a><div class="two"><div><span class="tag">${t.cat}</span><h1 style="font-size:clamp(26px,4vw,40px)">${esc(t.title)}</h1><p class="sub">${esc(t.desc)}</p>${url?`<div class="vbox">${player(url)}<a class="vopen" target="_blank" rel="noopener" href="${esc(/^https?:|\//.test(url)||url.includes('.')?url:'https://youtu.be/'+url)}">▷ Apri il video in una nuova scheda</a></div><a class="btn g" href="${esc(url)}" download target="_blank" rel="noopener">⬇ Scarica il video</a>`:player('')}${t.extra&&!t.mine?'':`<div class="card" style="margin-top:14px"><b>🔗 Link video</b><p style="margin:4px 0">Incolla un link YouTube o un file .mp4.</p><input id="vu" placeholder="https://..." value="${esc(t.mine?t.url:LS('vid_'+t.id,''))}"><button class="btn" id="vs">COLLEGA VIDEO</button><button class="btn g" id="vr">${t.mine?'Elimina video':'Rimuovi'}</button></div>`}</div><div><div class="card"><span class="tag">I consigli di Shieldo</span><ul class="tips">${t.tips.map(x=>`<li><i class="ck">✓</i>${x}</li>`).join('')||'<li>Guarda il video e parlane con un adulto.</li>'}</ul></div>${t.extra?'':`<div class="card" style="margin-top:16px"><span class="tag">Metti alla prova</span><p>Quiz disponibile: ${t.quiz.t}</p><a class="btn" style="width:100%;text-align:center" href="#quiz/${t.id}">📝 FAI IL QUIZ</a></div>`}</div></div>`;
 if($('#vs')){$('#vs').onclick=()=>{const v=$('#vu').value.trim();if(!v)return;if(t.mine){const l=LS('myv',[]);l[+t.id.slice(1)].url=v;SV('myv',l)}else SV('vid_'+t.id,v);impara(id)};
  $('#vr').onclick=()=>{if(t.mine){const l=LS('myv',[]);l.splice(+t.id.slice(1),1);SV('myv',l);location.hash='impara'}else{SV('vid_'+t.id,'');impara(id)}}}}

/* ===== QUIZ + CERTIFICATO (punteggio massimo 100) ===== */
const PASS=70;
function quiz(id){
 const res=LS('res',{});
 if(!id){app.innerHTML=`<h1>QUIZ</h1><p class="sub">Rispondi alle domande: il punteggio massimo è 100. Con almeno ${PASS} ottieni il certificato.</p>${SC('Non aver paura di sbagliare: ogni errore è una lezione.')}<div class="grid">${TOPICS.map(t=>`<div class="card"><span class="tag">${t.cat}</span><h3>${t.quiz.t}</h3><p>${t.quiz.qs.length} domande${res[t.id]!=null?` · Miglior risultato: <b>${res[t.id]}/100</b>`:''}</p><a class="btn" href="#quiz/${t.id}">INIZIA</a>${res[t.id]>=PASS?`<a class="btn g" href="#certificato/${t.id}">🏅 Certificato</a>`:''}</div>`).join('')}</div>`;return}
 const t=TOPICS.find(x=>x.id===id)||TOPICS[0],qs=t.quiz.qs;let i=0,ok=0,bad=[];
 const step=()=>{
  if(i>=qs.length){const pc=Math.round(ok/qs.length*100);res[t.id]=Math.max(res[t.id]||0,pc);SV('res',res);
   app.innerHTML=`<h1>${pc>=PASS?'🎉 Bravo!':'💪 Quasi!'}</h1><div class="card"><h2>${ok}/${qs.length} risposte giuste — punteggio ${pc}/100</h2><p>${pc>=PASS?'Hai superato il quiz: ecco il tuo certificato!':`Servono almeno ${PASS}/100 per il certificato. Rivedi il video e riprova.`}</p>${pc>=PASS?'':`<a class="btn g" href="#impara/${t.id}">▶ Rivedi il video</a>`}<button class="btn" id="rt">Riprova</button><a class="btn g" href="#quiz">Altri quiz</a></div>${bad.length?`<div class="card" style="margin-top:14px"><span class="tag">Da ripassare</span>${bad.map(b=>`<p style="margin:8px 0">• ${esc(b[0])}<br><b style="color:var(--te)">Risposta giusta: ${esc(b[1])}</b></p>`).join('')}</div>`:''}<div id="ch" style="margin-top:20px"></div>`;
   $('#rt').onclick=()=>quiz(t.id);if(pc>=PASS)certBlock($('#ch'),t,pc);return}
  const [q,o,c]=qs[i];
  app.innerHTML=`<span class="tag">${t.quiz.t} · ${i+1}/${qs.length}</span><div class="bar"><i style="width:${i/qs.length*100}%"></i></div><h1 style="font-size:28px">${q}</h1>${o.map((x,k)=>`<button class="opt" data-k="${k}">${esc(x)}</button>`).join('')}<div id="fb"></div>`;
  app.querySelectorAll('.opt').forEach(b=>b.onclick=()=>{const k=+b.dataset.k;app.querySelectorAll('.opt').forEach((x,j)=>{x.disabled=true;if(j===c)x.classList.add('ok')});if(k===c)ok++;else{b.classList.add('no');bad.push([q,o[c]])}
   $('#fb').innerHTML=`<p>${k===c?'✅ Esatto!':'❌ Non proprio: la risposta giusta è evidenziata.'}</p><button class="btn" id="nx">${i+1<qs.length?'Avanti →':'Vedi risultato'}</button>`;$('#nx').onclick=()=>{i++;step()}})};
 step()}
function certificato(id){
 const t=TOPICS.find(x=>x.id===id)||TOPICS[0],pc=LS('res',{})[t.id];
 if(pc==null||pc<PASS){app.innerHTML=`<h1>Certificato</h1><div class="card"><p>Supera prima il quiz (almeno ${PASS}/100) per sbloccarlo.</p><a class="btn" href="#quiz/${t.id}">Fai il quiz</a></div>`;return}
 app.innerHTML='<div id="ch"></div><a class="btn g" href="#quiz">Altri quiz</a>';certBlock($('#ch'),t,pc)}
function certBlock(host,t,pc){
 host.innerHTML=`<h2>🏅 Il tuo certificato</h2><input id="nm" maxlength="30" placeholder="Scrivi il tuo nome" value="${esc(LS('name',''))}" style="max-width:420px"><canvas id="cv" width="1000" height="700" style="width:100%;max-width:760px;display:block"></canvas><button class="btn" id="dl">⬇ SCARICA IL CERTIFICATO</button>
 <div class="card" style="margin-top:20px"><span class="tag">Il tuo attestato</span><h3>Carica un PDF o un’immagine</h3><p>Carica il tuo attestato per tenerlo qui e rivederlo quando vuoi.</p><input type="file" id="up" accept="image/*,application/pdf"><div id="upv"></div></div>`;
 const cv=$('#cv'),x=cv.getContext('2d');
 const im=[LOGO,MASCOT].map(v=>{const i=new Image();i.onload=()=>draw();i.src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(v.replace('<svg ','<svg xmlns="http://www.w3.org/2000/svg" '));return i});
 const draw=()=>{const n=$('#nm').value.trim()||'Giovane Difensore';SV('name',$('#nm').value.trim());
  x.fillStyle='#000';x.fillRect(0,0,1000,700);x.strokeStyle='#fb923c';x.lineWidth=10;x.beginPath();x.roundRect(20,20,960,660,36);x.stroke();x.lineWidth=2;x.beginPath();x.roundRect(45,45,910,610,26);x.stroke();
  if(im[0].naturalWidth)x.drawImage(im[0],440,55,120,110);
  x.textAlign='center';x.fillStyle='#fb923c';x.font='900 34px sans-serif';x.fillText('SHIELDO',500,200);
  x.fillStyle='#9aa4cc';x.font='16px sans-serif';x.fillText('A T T E S T A T O   N O N   U F F I C I A L E',500,235);
  x.fillStyle='#fb923c';x.font='900 54px sans-serif';x.fillText('CERTIFICATO DI SCUDO',500,300);
  x.fillStyle='#fff';x.font='20px sans-serif';x.fillText('conferito a',500,345);x.font='bold 46px sans-serif';x.fillText(n,500,405);
  x.font='20px sans-serif';x.fillStyle='#cbd5ff';x.fillText('per aver superato il quiz “'+t.quiz.t+'”',500,450);x.fillText('e per aver costruito il proprio scudo contro le minacce del web.',500,480);
  x.strokeStyle='#fb923c';x.lineWidth=2;x.beginPath();x.roundRect(370,515,260,60,30);x.stroke();x.fillStyle='#fb923c';x.font='bold 26px sans-serif';x.fillText(pc+'/100 SUPERATO',500,555);
  if(im[1].naturalWidth)x.drawImage(im[1],70,560,80,80);
  x.textAlign='right';x.fillStyle='#9aa4cc';x.font='20px sans-serif';x.fillText(new Date().toLocaleDateString('it-IT',{day:'numeric',month:'long',year:'numeric'}),930,610);x.fillStyle='#fb923c';x.fillText('Shieldo',930,640)};
 draw();$('#nm').oninput=draw;
 $('#dl').onclick=()=>{const a=document.createElement('a');a.download='certificato-shieldo.png';a.href=cv.toDataURL('image/png');a.click()};
 const showUp=d=>{$('#upv').innerHTML=(d.startsWith('data:application/pdf')?`<embed src="${d}" type="application/pdf" style="width:100%;height:520px;border-radius:12px;margin-top:10px">`:`<img src="${d}" style="max-width:100%;border-radius:12px;margin-top:10px">`)+'<br><button class="btn g" id="ud">Rimuovi</button>';$('#ud').onclick=()=>{SV('up_'+t.id,'');$('#upv').innerHTML='';$('#up').value=''}};
 const old=LS('up_'+t.id,'');if(old)showUp(old);
 $('#up').onchange=e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=()=>{showUp(r.result);SV('up_'+t.id,r.result)};r.readAsDataURL(f)}}

/* ===== EMERGENZA ===== */
function sos(){
 const N=[['🚑','Ambulanza','118','Emergenze mediche'],['🚓','Polizia di Stato','113','Reati e pericoli'],['🛡️','Carabinieri','112','Pronto intervento'],['🚒','Vigili del fuoco','115','Incendi e soccorso'],['🆘','Numero unico emergenze','112','Valido in tutta Europa'],['💙','Telefono Azzurro','19696','Aiuto per ragazzi (gratuito)']];
 app.innerHTML=`<h1>🚨 CHIAMATA DI EMERGENZA</h1><p class="sub">Tocca il pulsante per chiamare con un click dal telefono.</p>${SC('Chiama solo in caso di vera emergenza. Mantieni la calma e, se puoi, chiedi aiuto a un adulto.')}<div class="grid">${N.map(n=>`<div class="card sosc"><div class="ico">${n[0]}</div><h3>${n[1]}</h3><p>${n[3]}</p><a class="btn sos" href="tel:${n[2]}">📞 CHIAMA ${n[2]}</a></div>`).join('')}</div><div class="card" style="margin-top:20px"><span class="tag">Cosa dire</span><ul class="tips"><li><i class="ck">1</i>Dì chi sei e che cosa è successo.</li><li><i class="ck">2</i>Dì dove ti trovi (indirizzo o punto di riferimento).</li><li><i class="ck">3</i>Non riattaccare finché l’operatore non te lo dice.</li></ul><small style="color:var(--mu)">Su computer il pulsante funziona solo se hai un’app di chiamata collegata. I numeri sono quelli italiani.</small></div>`}

/* ===== PODCAST: per audio veri metti i link (mp3 da GitHub) in AUDIO, uno per episodio; se vuoto parla la voce del dispositivo ===== */
const AUDIO=['','','','',''];
function podcast(){
 app.innerHTML=`<section class="hero" style="grid-template-columns:1fr"><div><span class="pill">🎙️ PODCAST</span><h1>Le avventure di <span style="color:var(--or)">Scudo</span></h1><p class="sub">Episodi brevi da ascoltare con le cuffie: storie, trucchi e consigli per difenderti online mentre sei in cammino o prima di dormire.</p></div></section><h2>TUTTI GLI EPISODI</h2>${EPS.map((e,i)=>`<div class="card ep"><button class="play" data-i="${i}">▶</button><div><span class="tag">Episodio ${i+1}</span><h3 style="margin:2px 0">${e[0]}</h3><span style="color:var(--mu)">${e[1]}</span></div></div>`).join('')}`;
 let cur=-1,au=null;const bs=app.querySelectorAll('.play'),reset=()=>bs.forEach(b=>b.textContent='▶');
 const halt=()=>{speechSynthesis.cancel();if(au){au.pause();au=null}reset()};stopFn=halt;
 bs.forEach(b=>b.onclick=()=>{const i=+b.dataset.i;const same=cur===i;halt();if(same){cur=-1;return}
  cur=i;b.textContent='⏸';const end=()=>{reset();cur=-1};
  if(AUDIO[i]){au=new Audio(AUDIO[i]);au.onended=end;au.onerror=end;au.play().catch(end)}
  else{if(!('speechSynthesis' in window)){end();return alert('Il tuo browser non supporta la voce.')}const u=new SpeechSynthesisUtterance(EPS[i][2]);u.lang='it-IT';u.rate=.95;u.onend=end;u.onerror=end;speechSynthesis.speak(u)}})}

/* ===== FORUM ===== */
function forum(){
 let posts=LS('forum',FORUM0),f='Tutti';
 const draw=()=>{app.innerHTML=`<div style="display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap"><h1>FORUM</h1><button class="btn" id="nw">＋ NUOVA DOMANDA</button></div><p class="sub">Fai una domanda, racconta un dubbio o aiuta un altro ragazzo: insieme si impara meglio.</p>${SC('In questo forum nessuno è solo: chiedi aiuto senza vergogna e rispondi con gentilezza a chi ne ha bisogno.')}<div id="frm" class="card hide"><input id="ft" maxlength="90" placeholder="Titolo"><textarea id="fb" rows="3" maxlength="400" placeholder="Racconta..."></textarea><select id="fc">${CATS.map(c=>`<option>${c}</option>`).join('')}</select><input id="fa" maxlength="20" placeholder="Il tuo nickname (non il nome vero!)"><button class="btn" id="fs">PUBBLICA</button></div><div class="tabs">${['Tutti',...CATS].map(c=>`<button class="chip ${c===f?'on':''}" data-c="${c}">${c.toUpperCase()}</button>`).join('')}</div>${posts.filter(p=>f==='Tutti'||p.cat===f).map(p=>`<div class="card" style="margin-bottom:14px"><span class="tag">${p.cat}</span> <small style="color:var(--mu)">${p.d}</small><h3>${esc(p.t)}</h3><p>${esc(p.b)}</p><small style="color:var(--mu)">di ${esc(p.a)} · ${p.r.length} risposte</small>${p.r.map(r=>`<div class="rep">${esc(r)}</div>`).join('')}<form data-id="${p.id}" style="display:flex;gap:8px"><input placeholder="Rispondi con gentilezza..." maxlength="250"><button class="btn">Invia</button></form></div>`).join('')||'<p class="sub">Nessuna domanda qui: scrivi la prima!</p>'}`;
  $('#nw').onclick=()=>$('#frm').classList.toggle('hide');
  app.querySelectorAll('.chip').forEach(b=>b.onclick=()=>{f=b.dataset.c;draw()});
  $('#fs').onclick=()=>{const t=$('#ft').value.trim(),b=$('#fb').value.trim();if(!t||!b)return alert('Scrivi titolo e testo.');
   posts.unshift({id:Date.now(),cat:$('#fc').value,d:new Date().toLocaleDateString('it-IT',{day:'numeric',month:'long',year:'numeric'}),t,b,a:$('#fa').value.trim()||'Anonimo',r:[]});SV('forum',posts);draw()};
  app.querySelectorAll('form[data-id]').forEach(fm=>fm.onsubmit=e=>{e.preventDefault();const v=fm.querySelector('input').value.trim();if(!v)return;posts.find(p=>p.id==fm.dataset.id).r.push(v);SV('forum',posts);draw()})};
 draw()}

/* ===== GIOCHI + CLASSIFICHE TOP 10 (salvate nel browser) ===== */
const GAMES=[['mem','🧩','MEMORY DELLA SICUREZZA','Trova le coppie di simboli e scopri il significato di ogni icona della sicurezza.'],['esc','🔐','ESCAPE ROOM DELLE TRUFFE','Quattro stanze, quattro trappole online: scegli bene e scappa fuori.'],['run','🏃','SCUDO RUNNER','Corri con la mascotte e schiva truffe, virus e link pericolosi.'],['vf','⚡','VERO O FALSO LAMPO','60 secondi: vero o falso? Più ne indovini, più punti fai.'],['pw','🔑','PASSWORD MASTER','Costruisci la password più forte rispettando tutte le regole.']];
const lb=g=>LS('lb_'+g,[]),rec=g=>(lb(g)[0]||{}).p||0;
const lbHtml=g=>{const l=lb(g);return`<div class="card"><span class="tag">🏆 Classifica TOP 10</span>${l.length?`<ol class="lb">${l.map(e=>`<li><b>${esc(e.n)}</b><span>${e.p}</span></li>`).join('')}</ol>`:'<p>Nessun record: sii il primo!</p>'}<small style="color:var(--mu)">Il record resta salvato finché qualcuno non lo supera.</small></div>`};
function endGame(g,p){let n=LS('nick','');if(!n){n=(prompt('Scrivi il tuo nickname (non il nome vero!)')||'').trim().slice(0,14)||'Anonimo';SV('nick',n)}
 if(p>0){const l=lb(g),o=l.find(e=>e.n===n);if(o){if(p>o.p)o.p=p}else l.push({n,p});l.sort((a,b)=>b.p-a.p);l.splice(10);SV('lb_'+g,l)}
 const h=$('#lb');if(h)h.innerHTML=lbHtml(g)}
function giochi(g){
 if(!g){app.innerHTML=`<h1>GIOCHI</h1><p class="sub">Allenati divertendoti: ogni gioco ti insegna a riconoscere un pericolo del web.</p>${SC('Scegli il tuo gioco preferito! Io tifo per te: qui si impara giocando.')}<div class="card" style="margin-bottom:18px"><b>👤 Il tuo nickname</b> <small style="color:var(--mu)">(usalo per le classifiche, non il nome vero)</small><div style="display:flex;gap:8px"><input id="nk" maxlength="14" placeholder="Nickname" value="${esc(LS('nick',''))}"><button class="btn" id="nb">SALVA</button></div></div><div class="grid">${GAMES.map(x=>`<div class="card gc"><div style="display:flex;justify-content:space-between"><span class="ico">${x[1]}</span><span class="tag">🏆 ${rec(x[0])} punti</span></div><h3>${x[2]}</h3><p>${x[3]}</p><a class="btn" style="width:100%;text-align:center" href="#giochi/${x[0]}">GIOCA →</a></div>`).join('')}</div>`;
  $('#nb').onclick=()=>{const v=$('#nk').value.trim().slice(0,14);if(v){SV('nick',v);$('#nb').textContent='SALVATO ✓'}};return}
 const G=GAMES.find(x=>x[0]===g)||GAMES[0];
 app.innerHTML=`<a href="#giochi" class="back">← Tutti i giochi</a><h1>${G[2]}</h1><p class="sub">${G[3]} Giochi come: <b>${esc(LS('nick','(chiederò il nickname a fine partita)'))}</b></p><div class="two"><div id="gm"></div><div id="lb">${lbHtml(g)}</div></div>`;
 const gm=$('#gm');
 if(g==='mem'){const P=[['🔒','Lucchetto: i tuoi dati sono protetti'],['🔑','Password: tienila segreta'],['🛡️','Scudo: antivirus attivo'],['📶','Wi-Fi pubblico: attenzione ai dati'],['⚠️','Allarme: possibile truffa'],['🎣','Phishing: esca per rubare password'],['🦠','Virus: programma dannoso'],['🤖','IA: contenuto generato']];
  const d=[...P,...P].sort(()=>Math.random()-.5);let a=null,lock=false,m=0,fo=0;
  gm.innerHTML=`<p id="inf" class="sub">Trova le coppie!</p><div class="memg">${d.map((c,i)=>`<button class="mc" data-i="${i}">❓</button>`).join('')}</div>`;
  gm.querySelectorAll('.mc').forEach(b=>b.onclick=()=>{if(lock||b.classList.contains('done')||b===a)return;const i=+b.dataset.i;b.textContent=d[i][0];b.classList.add('up');
   if(!a){a=b;return}m++;const j=+a.dataset.i;
   if(d[i][0]===d[j][0]){b.classList.add('done');a.classList.add('done');$('#inf').textContent='✅ '+d[i][1];a=null;if(++fo===8){const p=Math.max(100,1000-m*30);$('#inf').textContent=`🎉 Finito in ${m} mosse! Punti: ${p}`;endGame('mem',p)}}
   else{lock=true;const x=a;a=null;setTimeout(()=>{[b,x].forEach(e=>{e.textContent='❓';e.classList.remove('up')});lock=false},800)}})}
 if(g==='esc'){const R=[['📧 Stanza 1: arriva una mail “La tua banca ti chiede la password in 1 ora!”',['Clicco e accedo','Ignoro il link e contatto la banca con i canali ufficiali','Rispondo con la password'],1],['🎁 Stanza 2: un pop-up dice “Hai vinto una PlayStation, inserisci i dati della carta”',['Inserisco i dati','Chiudo la pagina: è una truffa','Condivido il link con gli amici'],1],['👤 Stanza 3: uno sconosciuto in chat vuole la tua foto e il tuo indirizzo',['Gli mando tutto','Blocco, segnalo e lo dico a un adulto','Gli do solo la via'],1],['🎮 Stanza 4: “Scarica questo hack gratis per il gioco!” (file .apk da un sito strano)',['Lo scarico','Non lo scarico: può contenere virus','Lo mando agli amici'],1]];
  let i=0,ok=0;const s=()=>{if(i>=R.length){const p=ok*250;endGame('esc',p);gm.innerHTML=`<h2>${ok===4?'🎉 Sei fuori!':'Fine'}</h2><p class="sub">Stanze superate: ${ok}/4 · Punti: ${p}</p><button class="btn" id="ag">Riprova</button>`;$('#ag').onclick=()=>giochi('esc');return}
   gm.innerHTML=`<div class="bar"><i style="width:${i*25}%"></i></div><h2>${R[i][0]}</h2>${R[i][1].map((o,k)=>`<button class="opt" data-k="${k}">${o}</button>`).join('')}<div id="fb"></div>`;
   gm.querySelectorAll('.opt').forEach(b=>b.onclick=()=>{const r=+b.dataset.k===R[i][2];if(r)ok++;gm.querySelectorAll('.opt').forEach(x=>x.disabled=true);b.classList.add(r?'ok':'no');$('#fb').innerHTML=`<p>${r?'🔓 Porta aperta!':'🚪 Trappola! La scelta giusta era un’altra.'}</p><button class="btn" id="nx">Avanti →</button>`;$('#nx').onclick=()=>{i++;s()}})};s()}
 if(g==='vf'){const Q=[['Una password lunga con lettere, numeri e simboli è più sicura.',1],['Posso dare la password a un amico fidato.',0],['Un link che promette un premio gratis può essere phishing.',1],['Le app vanno scaricate solo dagli store ufficiali.',1],['Se uno sconosciuto online mi chiede la foto, gliela mando.',0],['Il Wi-Fi pubblico è sempre sicuro per inserire password.',0],['Gli aggiornamenti del telefono servono anche per la sicurezza.',1],['Una foto perfetta online è sempre vera.',0],['Posso usare la stessa password ovunque.',0],['Se qualcosa mi mette a disagio online lo dico a un adulto.',1],['I deepfake sono video falsi creati con l’IA.',1],['Cliccare su tutti i pop-up è innocuo.',0],['Un messaggio con “ultime 2 ore!” può essere una truffa.',1],['Chi mi chiede di tenere segreti agli adulti va bene.',0]].sort(()=>Math.random()-.5);
  let i=0,p=0,t=60,iv=null;const fin=()=>{clearInterval(iv);p=Math.max(0,p);gm.innerHTML=`<h2>⏱️ Tempo scaduto!</h2><p class="sub">Punti: ${p}</p><button class="btn" id="ag">Rigioca</button>`;endGame('vf',p);$('#ag').onclick=()=>giochi('vf')};
  const q=()=>{const x=Q[i%Q.length];gm.innerHTML=`<div class="bar"><i style="width:${t/60*100}%"></i></div><p class="tag">⏱️ ${t}s · Punti: ${p}</p><h2 style="min-height:90px">${x[0]}</h2><div style="display:flex;gap:10px"><button class="btn" style="flex:1;background:#22c55e" data-v="1">✅ VERO</button><button class="btn" style="flex:1;background:#f43f5e;color:#fff" data-v="0">❌ FALSO</button></div>`;
   gm.querySelectorAll('[data-v]').forEach(b=>b.onclick=()=>{p+=(+b.dataset.v===x[1])?10:-5;i++;q()})};
  q();iv=setInterval(()=>{t--;if(t<=0)fin();else{const tg=gm.querySelector('.tag');if(tg)tg.textContent=`⏱️ ${t}s · Punti: ${p}`;const b=gm.querySelector('.bar i');if(b)b.style.width=t/60*100+'%'}},1000);stopFn=()=>clearInterval(iv)}
 if(g==='pw'){const RU=[['Almeno 12 caratteri',v=>v.length>=12],['Una lettera maiuscola',v=>/[A-Z]/.test(v)],['Una lettera minuscola',v=>/[a-z]/.test(v)],['Un numero',v=>/\d/.test(v)],['Un simbolo (!?#$%&…)',v=>/[^\w\s]/.test(v)],['Niente “password”, “1234” o “qwerty”',v=>v&&!/password|1234|qwerty|admin/i.test(v)],['Niente caratteri ripetuti (aaa)',v=>v&&!/(.)\1\1/.test(v)]];
  gm.innerHTML=`<div class="card"><p>Inventa una password nuova: <b>non usare la tua vera password!</b> Non viene inviata a nessuno.</p><input id="pi" placeholder="Scrivi qui..." maxlength="40" autocomplete="off"><div class="bar"><i id="pb" style="width:0"></i></div><ul id="pr" class="tips"></ul><button class="btn" id="ps">SALVA PUNTEGGIO</button></div>`;
  const calc=()=>{const v=$('#pi').value,r=RU.map(x=>!!x[1](v)),n=r.filter(Boolean).length;$('#pr').innerHTML=RU.map((x,k)=>`<li style="color:${r[k]?'#22c55e':'var(--mu)'}">${r[k]?'✅':'⬜'} ${x[0]}</li>`).join('');$('#pb').style.width=n/RU.length*100+'%';return n*100+Math.min(v.length,24)*10};
  calc();$('#pi').oninput=calc;$('#ps').onclick=()=>{const p=calc();endGame('pw',p);$('#ps').textContent='Salvato: '+p+' punti ✓'}}
 if(g==='run'){gm.innerHTML=`<p class="sub">Punti: <b id="pt">0</b> · 🏆 record <b>${rec('run')}</b> — frecce, A/D, pulsanti o tocca il lato sinistro/destro.</p><canvas id="c" width="420" height="600" style="width:100%;max-width:420px;background:#000;touch-action:none;display:block"></canvas><div style="display:flex;gap:10px;max-width:420px;margin-top:10px"><button class="btn g" id="bl" style="flex:1">◀ Sinistra</button><button class="btn g" id="br" style="flex:1">Destra ▶</button></div><button class="btn" id="rs">RICOMINCIA</button>`;
  const c=$('#c'),x=c.getContext('2d'),L=[0,140,280],N=['TRUFFA','VIRUS','FALSO LINK','PHISHING','FAKE'];let ln,ob,fr,sp,over,raf;
  const rr=(a,b,w,h,f,st,txt,col)=>{x.beginPath();x.roundRect(a,b,w,h,16);x.fillStyle=f;x.fill();x.lineWidth=3;x.strokeStyle=st;x.stroke();x.fillStyle=col;x.font='bold 14px sans-serif';x.textAlign='center';x.fillText(txt,a+w/2,b+h/2+5)};
  const init=()=>{cancelAnimationFrame(raf);ln=1;ob=[];fr=0;sp=4;over=false;loop()};
  const mv=d=>{if(!over)ln=Math.max(0,Math.min(2,ln+d))};
  const key=e=>{if(['ArrowLeft','a','A'].includes(e.key)){mv(-1);e.preventDefault()}if(['ArrowRight','d','D'].includes(e.key)){mv(1);e.preventDefault()}};
  addEventListener('keydown',key);stopFn=()=>{cancelAnimationFrame(raf);removeEventListener('keydown',key)};
  $('#bl').onclick=()=>mv(-1);$('#br').onclick=()=>mv(1);$('#rs').onclick=init;
  c.addEventListener('pointerdown',e=>{const r=c.getBoundingClientRect();mv(e.clientX-r.left<r.width/2?-1:1)});
  function loop(){fr++;sp=4+fr/500;
   if(fr%Math.max(28,70-Math.floor(fr/60))===0){const a=Math.random()*3|0,l=[a];if(Math.random()<.35)l.push((a+1+(Math.random()*2|0))%3);l.forEach(k=>ob.push({l:k,y:-80,n:N[Math.random()*5|0]}))}
   ob.forEach(o=>o.y+=sp);ob=ob.filter(o=>o.y<620);
   x.fillStyle='#000';x.fillRect(0,0,420,600);x.strokeStyle='#1f2747';x.lineWidth=1;[140,280].forEach(v=>{x.beginPath();x.moveTo(v,0);x.lineTo(v,600);x.stroke()});
   ob.forEach(o=>rr(L[o.l]+22,o.y,96,72,'#3a0a1c','#f43f5e',o.n,'#fff'));
   rr(L[ln]+22,500,96,80,'#3a1c06','#fb923c','SCUDO','#fb923c');
   if(ob.some(o=>o.l===ln&&o.y+72>505&&o.y<578)){over=true;const p=Math.floor(fr/6);endGame('run',p);x.fillStyle='#000c';x.fillRect(0,230,420,130);x.fillStyle='#fff';x.font='bold 30px sans-serif';x.textAlign='center';x.fillText('Preso! Punti: '+p,210,285);x.font='16px sans-serif';x.fillText('Premi RICOMINCIA',210,320);return}
   $('#pt').textContent=Math.floor(fr/6);raf=requestAnimationFrame(loop)}
  init()}}

/* ===== AI SCANNER (analisi euristica locale: indicativa, non una prova) ===== */
function scanner(){
 const H=LS('hist',[]);let tab='img',file=null;
 const draw=()=>{app.innerHTML=`<h1>AI SCANNER</h1><p class="sub">Carica un'immagine o incolla il link di un sito, un video o un profilo: Shieldo analizza il contenuto e ti dice se è creato con l'intelligenza artificiale o se nasconde una truffa.</p>${SC('Mostrami quello che ti sembra strano: immagini, video o link. Ti dirò cosa ho notato e come difenderti.')}<div class="two"><div><div class="tabs"><button class="btn ${tab=='img'?'':'g'}" data-t="img">🖼 IMMAGINE</button><button class="btn ${tab=='lnk'?'':'g'}" data-t="lnk">🔗 LINK O VIDEO</button></div><div class="card">${tab=='img'?`<input type="file" id="fi" accept="image/*"><img id="pv" class="hide" style="max-width:100%;border-radius:12px;margin-top:10px"><p style="font-size:13px">Il file resta sul tuo dispositivo e viene usato solo per l'analisi.</p>`:`<input id="li" placeholder="https://..." inputmode="url">`}<button class="btn" id="an" style="width:100%">ANALIZZA</button></div><div id="out"></div></div><div><span class="tag">Ultimi controlli</span><div class="hist" style="margin-top:10px">${H.map(h=>`<div class="card"><span class="tag" style="color:${h.c}">${h.v}</span><div style="word-break:break-all;color:var(--mu);font-size:14px">${esc(h.n)}</div></div>`).join('')||'<p class="sub">Ancora nulla.</p>'}</div></div></div>`;
  app.querySelectorAll('[data-t]').forEach(b=>b.onclick=()=>{tab=b.dataset.t;file=null;draw()});
  if(tab=='img'){$('#fi').onchange=e=>{file=e.target.files[0];if(file){const p=$('#pv');p.src=URL.createObjectURL(file);p.classList.remove('hide')}}}
  $('#an').onclick=()=>{const r=tab=='img'?scanImg():scanLink();if(r)show(r)}};
 const show=r=>{const cls=r.s>=60?'bad':r.s>=30?'mid':'good';
  $('#out').innerHTML=`<div class="res ${cls}"><b>${r.v}</b><ul>${r.w.map(w=>`<li>${w}</li>`).join('')}</ul><p><b>Come difenderti:</b> ${r.adv}</p><small style="color:var(--mu)">Analisi indicativa basata su indizi: nessuno strumento è sicuro al 100%. Nel dubbio chiedi a un adulto.</small></div>`;
  H.unshift({v:r.v.replace(/^[^A-Z]*/,''),c:cls=='bad'?'#f43f5e':cls=='mid'?'#facc15':'#22c55e',n:r.n});H.splice(8);SV('hist',H);draw();show2(r,cls)};
 const show2=(r,cls)=>{$('#out').innerHTML=`<div class="res ${cls}"><b>${r.v}</b><ul>${r.w.map(w=>`<li>${w}</li>`).join('')}</ul><p><b>Come difenderti:</b> ${r.adv}</p><small style="color:var(--mu)">Analisi indicativa basata su indizi: nessuno strumento è sicuro al 100%. Nel dubbio chiedi a un adulto.</small></div>`};
 const scanImg=()=>{if(!file){alert('Scegli prima una foto.');return}
  let s=0,w=[];const n=file.name.toLowerCase();
  if(/midjourney|dall|dalle|firefly|stable|diffusion|gemini|generated|\bai\b|chatgpt|flux|leonardo|copilot|grok/.test(n)){s+=55;w.push('Il nome del file richiama un generatore di immagini IA.')}
  if(/^(image|img|download)?[\s_-]*\(?\d*\)?\.(png|webp)$/.test(n)||/^[0-9a-f-]{20,}\./.test(n)){s+=10;w.push('Nome file generico, tipico di immagini scaricate o generate.')}
  if(file.type==='image/png'&&file.size>900000){s+=10;w.push('PNG molto pesante senza dati di fotocamera: comune nelle immagini IA.')}
  if(!w.length)w.push('Nessun indizio evidente nel file. Controlla a mano mani, denti, testi e sfondi.');
  return new Promise(()=>{}),(()=>{const im=$('#pv');const f=()=>{const W=im.naturalWidth,Hh=im.naturalHeight;const p2=[512,768,1024,1536,2048];
    if(p2.includes(W)&&p2.includes(Hh)){s+=25;w.push(`Dimensioni ${W}×${Hh}: formato tipico dei generatori IA.`)}else if(W===Hh){s+=10;w.push('Immagine perfettamente quadrata.')}
    s=Math.min(100,s);const v=s>=60?'⚠️ PROBABILMENTE CREATO DALL’IA':s>=30?'🤔 POTREBBE ESSERE IA, CONTROLLA':'✅ SEMBRA UN CONTENUTO REALE';
    show({s,v,w,n:file.name,adv:'Fai una ricerca per immagine, cerca errori in mani e testi e verifica la fonte prima di condividerla.'})};
   im.complete?f():im.onload=f;return null})()};
 const scanLink=()=>{let raw=$('#li').value.trim();if(!raw){alert('Incolla un link.');return}
  let u;try{u=new URL(/^https?:/i.test(raw)?raw:'https://'+raw)}catch{alert('Link non valido.');return}
  let s=0,w=[];const h=u.hostname.toLowerCase(),full=u.href.toLowerCase();
  if(u.protocol!=='https:'){s+=25;w.push('Il sito non usa HTTPS (connessione non sicura).')}
  if(/^\d+\.\d+\.\d+\.\d+$/.test(h)){s+=40;w.push('Usa un indirizzo numerico invece di un nome.')}
  if(/(bit\.ly|tinyurl|t\.co|cutt\.ly|is\.gd|rb\.gy|shorturl)/.test(h)){s+=25;w.push('Link accorciato: non si vede dove porta.')}
  if(/\.(xyz|top|click|gq|tk|ml|cf|ga|icu|buzz|rest|work)$/.test(h)){s+=25;w.push('Estensione di dominio spesso usata nelle truffe.')}
  if(h.includes('xn--')){s+=30;w.push('Caratteri camuffati nell’indirizzo (possibile imitazione di un sito vero).')}
  if((h.match(/-/g)||[]).length>=3){s+=15;w.push('Troppi trattini nell’indirizzo.')}
  if(u.href.includes('@')){s+=30;w.push('Contiene “@”: trucco per nascondere la vera destinazione.')}
  if(/(free|gratis|premio|prize|winner|vinci|regalo|bonus|giveaway|robux|vbucks|hack|crack)/.test(full)){s+=30;w.push('Parole da esca: premi, gratis, hack…')}
  if(/(login|signin|verify|account|password|secure|bloccato|update)/.test(full)&&!/(google|microsoft|apple|instagram|facebook|tiktok|youtube)\.com$/.test(h)){s+=20;w.push('Chiede accesso o verifica account da un sito che non sembra quello ufficiale.')}
  if(/(g00gle|paypa1|faceb00k|1nstagram|tikt0k|netfl1x|amaz0n)/.test(h)){s+=40;w.push('Imita il nome di un sito famoso con numeri al posto delle lettere.')}
  if(/(midjourney|openai|runwayml|pika|heygen|d-id|elevenlabs|synthesia)/.test(h)){s+=35;w.push('Il sito è uno strumento che crea contenuti con l’IA.')}
  if(raw.length>150){s+=10;w.push('Indirizzo lunghissimo.')}
  s=Math.min(100,s);if(!w.length)w.push('Nessun segnale di pericolo evidente nell’indirizzo.');
  const ai=/(midjourney|openai|runwayml|pika|heygen|d-id|elevenlabs|synthesia)/.test(h);
  const v=ai?'🤖 STRUMENTO IA':s>=60?'⚠️ PROBABILE TRUFFA':s>=30?'🤔 SOSPETTO, STAI ATTENTO':'✅ SEMBRA UN CONTENUTO REALE';
  return{s:ai?Math.max(s,60):s,v,w,n:raw,adv:'Non inserire password o dati. Apri il sito scrivendo tu l’indirizzo ufficiale e, se sei già entrato, cambia password e avvisa un adulto.'}};
 draw()}

route();
