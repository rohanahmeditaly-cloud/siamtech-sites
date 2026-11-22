'use strict';
const $=(s,r=document)=>r.querySelector(s), app=$('#app');
const LS=(k,d)=>{try{const v=JSON.parse(localStorage.getItem('sh_'+k));return v??d}catch{return d}};
const SV=(k,v)=>{try{localStorage.setItem('sh_'+k,JSON.stringify(v))}catch{}};
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const SC=(t)=>`<div class="scudo"><span class="av"><img src="logo-emblem.png" alt=""></span><div><b>SCUDO</b>${t}</div></div>`;

/* ===== DATI: modifica qui contenuti, video (yt = ID YouTube oppure file "video/nome.mp4"), quiz ===== */
const BOT='<img src="ic-chat.png" alt="">';
/* ===== DATABASE: Firebase Realtime DB via REST (config.js). Senza URL: salvataggio locale ===== */
const DBU=(typeof SHIELDO_DB!=='undefined'?SHIELDO_DB:'').replace(/\/$/,''),ONLINE=!!DBU;
const walk=(o,ps)=>ps.reduce((a,k)=>a==null?a:a[k],o);
async function dget(p){if(ONLINE){const r=await fetch(`${DBU}/${p}.json`);if(!r.ok)throw 0;return await r.json()}return walk(LS('tree',{}),p.split('/'))??null}
async function dput(p,v){if(ONLINE){const r=await fetch(`${DBU}/${p}.json`,{method:'PUT',body:JSON.stringify(v)});if(!r.ok)throw 0;return}
 const t=LS('tree',{}),ps=p.split('/'),l=ps.pop();let o=t;ps.forEach(k=>o=o[k]=o[k]||{});o[l]=v;SV('tree',t)}
const BAD=/(cazz|merd|stronz|fuck|shit|puttan|troi|negro|bastard|vaffa|figa|minchia)/i;
const nkey=n=>n.toLowerCase().replace(/[.$#\[\]\/\s]/g,'_');
const okNick=v=>v.length>=2&&v.length<=14&&/^[\w\- àèéìòù]+$/i.test(v)&&!BAD.test(v);
async function saveNick(v){v=(v||'').trim().slice(0,14);if(!okNick(v)){alert('Nickname non valido: usa 2-14 lettere o numeri, senza parolacce.');return false}SV('nick',v);try{await dput('nicks/'+nkey(v),{n:v,t:Date.now()})}catch{}return true}
const unsafe=v=>BAD.test(v)||/[\w.+-]+@[\w-]+\.\w+/.test(v)||/\d{8,}/.test(v.replace(/[\s-]/g,''))||/https?:\/\/|www\./i.test(v);
const IC=n=>`<img class="ic" src="ic-${n}.png" alt="">`;
const PAGES=[['home',IC('home'),'HOME'],['impara',IC('impara'),'IMPARA'],['quiz',IC('quiz'),'QUIZ'],['giochi',IC('giochi'),'GIOCHI'],['forum',IC('forum'),'FORUM'],['chat',IC('chat'),'CHIEDI A SHIELDO'],['scanner',IC('ai'),'AI SCANNER'],['sos',IC('sos'),'EMERGENZA']];
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
const SEED=[
{id:'s1',ex:1,cat:'Truffe & Phishing',d:Date.UTC(2026,9,16,17,0),a:'Luca13',t:'Un link mi ha chiesto la password del gioco online',b:'Stavo giocando e un sito mi ha detto che il mio account era bloccato e mi ha chiesto la password per sbloccarlo. Non l’ho data e ho chiuso la pagina. Ho fatto bene?',r:[{a:'Sara12',d:Date.UTC(2026,9,16,18,0),b:'Hai fatto benissimo! Nessun gioco serio ti chiede la password tramite un link.'},{a:'Marco14',d:Date.UTC(2026,9,16,20,0),b:'Controlla l’account dall’app ufficiale e, per sicurezza, cambia password con l’aiuto di un adulto.'}]},
{id:'s2',ex:1,cat:'Altro',d:Date.UTC(2026,9,16,15,0),a:'Giulia12',t:'Come faccio a capire se una foto è fatta con l’IA?',b:'Sul web ho visto foto bellissime ma un po’ strane. C’è un modo per capire se sono create dall’intelligenza artificiale?',r:[{a:'Davide13',d:Date.UTC(2026,9,16,16,0),b:'Guarda le mani e i testi: sono i punti dove l’IA sbaglia di più. Prova anche l’AI Scanner di Shieldo!'}]},
{id:'s3',ex:1,cat:'Profili falsi',d:Date.UTC(2026,9,18,16,0),a:'Alessia13',t:'Uno sconosciuto dice di avere la mia età e mi scrive ogni giorno',b:'Mi ha scritto su un social e dice di avere 13 anni. Fa tante domande su dove abito e vuole le mie foto. Mi sembra strano.',r:[{a:'Tommaso14',d:Date.UTC(2026,9,18,17,0),b:'Il tuo sospetto è giusto: non rispondere, blocca e segnala il profilo.'},{a:'Giulia12',d:Date.UTC(2026,9,18,19,0),b:'Dillo subito ai tuoi genitori: chi chiede foto e indirizzo non è un vero amico.'}]},
{id:'s4',ex:1,cat:'Password & Privacy',d:Date.UTC(2026,9,19,14,0),a:'Matteo11',t:'Posso dare la password a un amico di classe?',b:'Il mio migliore amico mi ha chiesto la password del mio account del gioco per aiutarmi a salire di livello. Posso fidarmi?',r:[{a:'Chiara13',d:Date.UTC(2026,9,19,15,0),b:'Meglio di no: la password è segreta, anche tra amici. Se litigate, potrebbe usarla male.'},{a:'Luca13',d:Date.UTC(2026,9,19,18,0),b:'Se vuoi aiutarlo, giocate insieme senza darvi le password. E cambiane una forte, lunga e solo tua!'}]}];
const arr=r=>Array.isArray(r)?r:Object.values(r||{});
const CATS=['Virus & Malware','Profili falsi','Truffe & Phishing','Password & Privacy','Altro'];

/* ===== ROUTER ===== */
$('#nav').innerHTML=PAGES.map(p=>`<a href="#${p[0]}" data-p="${p[0]}"><span class="nt">${p[1]}</span>${p[2]}</a>`).join('');
$('.brand').innerHTML='<img src="logo-emblem.png" alt=""><span>SHIELDO</span>';
const tg=v=>document.body.classList.toggle('nav-open',v);$('#burger').onclick=()=>tg();$('#bd').onclick=$('#sx').onclick=()=>tg(false);
let stopFn=null;
function route(){
 if(stopFn){stopFn();stopFn=null}
 const [p,arg]=(location.hash.slice(1)||'home').split('/');
 document.body.classList.remove('nav-open');
 document.querySelectorAll('#nav a').forEach(a=>a.classList.toggle('on',a.dataset.p===p||(p==='certificato'&&a.dataset.p==='quiz')));
 const R={home,impara,quiz,giochi,forum,chat,scanner,certificato,sos};(R[p]||home)(arg);
 scrollTo(0,0);
}
addEventListener('hashchange',route);

/* ===== HOME ===== */
function home(){app.innerHTML=`<section class="hero"><div><span class="pill">👋 CIAO, FUTURO CYBEREROE!</span><h1>Costruisci il tuo <span class="hl">scudo</span> digitale</h1><p class="sub">Shieldo ti insegna a riconoscere virus, profili falsi, truffe e contenuti creati dall'intelligenza artificiale. Impara, gioca, fai il quiz e ricevi il tuo certificato.</p><a class="btn" href="#impara">INIZIA A IMPARARE →</a><a class="btn" href="#scanner"><img class="ic ai" src="ic-ai.png" alt=""> AI SCANNER</a><button class="btn" id="inst" style="display:none">${IC('download')} SCARICA APP</button></div><div class="mascot"><img src="logo-full.png" alt="Shieldo"></div></section>
<h2>Cosa trovi</h2><div class="grid">${PAGES.slice(1).map(p=>`<a class="card" href="#${p[0]}" style="text-decoration:none;color:inherit"><div class="ico">${p[1]}</div><h3>${p[2]}</h3></a>`).join('')}</div>`;
 const b=$('#inst'); b.style.display='inline-block';
 b.onclick=async()=>{if(window._dp){_dp.prompt();_dp=null}else alert('Per installare l’app: dal menu del browser scegli “Aggiungi a schermata Home” / “Installa app”.')}}
addEventListener('beforeinstallprompt',e=>{e.preventDefault();window._dp=e});

/* ===== IMPARA: i video delle lezioni li metti TU in videos.json; gli utenti possono solo aggiungere i propri link ===== */
let VJ=[];fetch('videos.json').then(r=>r.json()).then(j=>{VJ=Array.isArray(j)?j:[];if(location.hash.startsWith('#impara'))route()}).catch(()=>{});
const ytid=u=>{const m=(u||'').match(/(?:youtu\.be\/|[?&]v=|embed\/|shorts\/)([\w-]{11})/);return m?m[1]:(/^[\w-]{11}$/.test(u||'')?u:null)};
const yts=q=>'https://www.youtube.com/results?search_query='+encodeURIComponent(q);
const allV=()=>[...TOPICS.map(t=>({...t,url:(VJ.find(v=>v.topic===t.id)||{}).url||t.yt})),...VJ.filter(v=>!v.topic&&v.url).map((v,i)=>({id:'x'+i,cat:v.cat||'Video',title:v.title||'Video',desc:v.desc||'',url:v.url,tips:v.tips||[],extra:1,q:v.title||'sicurezza online ragazzi'})),...LS('myv',[]).map((v,i)=>({id:'m'+i,cat:'I tuoi video',title:v.title,desc:'Aggiunto da te',url:v.url,tips:[],extra:1,mine:1,q:v.title+' sicurezza online'}))];
function player(u){if(!u)return'<div class="card"><p>🎬 Il video di questa lezione arriverà presto. Intanto leggi i consigli di Shieldo o cercalo su YouTube.</p></div>';const y=ytid(u);
 return y?`<iframe class="vid" src="https://www.youtube-nocookie.com/embed/${y}" allow="encrypted-media;picture-in-picture;fullscreen" allowfullscreen></iframe>`:`<video class="vid" controls playsinline src="${esc(u)}"></video>`}
function impara(id){
 const V=allV();
 if(!id){app.innerHTML=`<h1>IMPARA</h1><p class="sub">Scegli un video: guarda, leggi i consigli di Shieldo e poi metti alla prova ciò che hai imparato.</p>${SC('Ogni video ti dà un superpotere contro i pericoli del web.')}<div class="grid">${V.map(t=>{const y=ytid(t.url);return`<a class="card vc" href="#impara/${t.id}"><div class="thumb" ${y?`style="background-image:url(https://i.ytimg.com/vi/${y}/hqdefault.jpg)"`:''}><i>▶</i></div><span class="tag">${t.cat}</span><h3>${esc(t.title)}</h3><p>${esc(t.desc)}</p></a>`}).join('')}</div><h2>＋ Aggiungi un tuo video</h2><div class="card"><p>Incolla il titolo e il link di un video (YouTube o file .mp4). Lo vedrai solo tu, su questo dispositivo.</p><input id="at" placeholder="Titolo del video" maxlength="80"><input id="au" placeholder="https://..."><button class="btn" id="ab">AGGIUNGI VIDEO</button><button class="btn g" id="as">🔎 Cerca video su YouTube</button></div>`;
  $('#ab').onclick=()=>{const t=$('#at').value.trim(),u=$('#au').value.trim();if(!t||!u)return alert('Scrivi titolo e link.');if(unsafe(t))return alert('Titolo non valido.');const l=LS('myv',[]);l.push({title:t,url:u});SV('myv',l);impara()};
  $('#as').onclick=()=>window.open(yts(($('#at').value.trim()||'')+' sicurezza online per ragazzi'),'_blank','noopener');return}
 const t=V.find(x=>x.id===id)||V[0],url=t.url;
 app.innerHTML=`<a href="#impara" class="back">← Tutti i video</a><div class="two"><div><span class="tag">${t.cat}</span><h1 style="font-size:clamp(26px,4vw,40px)">${esc(t.title)}</h1><p class="sub">${esc(t.desc)}</p>${url?`<div class="vbox">${player(url)}<a class="vopen" target="_blank" rel="noopener" href="${esc(/^https?:|\//.test(url)||url.includes('.')?url:'https://youtu.be/'+url)}">▷ Apri il video in una nuova scheda</a></div><a class="btn g" href="${esc(url)}" download target="_blank" rel="noopener">⬇ Scarica il video</a>`:player('')}<a class="btn g" target="_blank" rel="noopener" href="${yts(t.q||t.title)}">🔎 Cerca altri video su YouTube</a>${t.mine?`<div class="card" style="margin-top:14px"><b>🔗 Il tuo video</b><input id="vu" value="${esc(t.url)}"><button class="btn" id="vs">SALVA LINK</button><button class="btn g" id="vr">Elimina video</button></div>`:''}</div><div><div class="card"><span class="tag">I consigli di Shieldo</span><ul class="tips">${t.tips.map(x=>`<li><i class="ck">✓</i>${x}</li>`).join('')||'<li>Guarda il video e parlane con un adulto.</li>'}</ul></div>${t.extra?'':`<div class="card" style="margin-top:16px"><span class="tag">Metti alla prova</span><p>Quiz disponibile: ${t.quiz.t}</p><a class="btn" style="width:100%;text-align:center" href="#quiz/${t.id}">📝 FAI IL QUIZ</a></div>`}</div></div>`;
 if(t.mine){$('#vs').onclick=()=>{const v=$('#vu').value.trim();if(!v)return;const l=LS('myv',[]);l[+t.id.slice(1)].url=v;SV('myv',l);impara(id)};
  $('#vr').onclick=()=>{const l=LS('myv',[]);l.splice(+t.id.slice(1),1);SV('myv',l);location.hash='impara'}}}

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
 const li=new Image();li.onload=()=>draw();li.src=LOGO_DATA;
 const draw=()=>{const n=$('#nm').value.trim()||'Giovane Difensore';SV('name',$('#nm').value.trim());
  x.fillStyle='#000';x.fillRect(0,0,1000,700);x.strokeStyle='#fb923c';x.lineWidth=10;x.beginPath();x.roundRect(20,20,960,660,36);x.stroke();x.lineWidth=2;x.beginPath();x.roundRect(45,45,910,610,26);x.stroke();
  if(li.naturalWidth)x.drawImage(li,415,48,170,123);
  x.textAlign='center';x.fillStyle='#fb923c';x.font='900 34px sans-serif';x.fillText('SHIELDO',500,200);
  x.fillStyle='#9aa4cc';x.font='16px sans-serif';x.fillText('A T T E S T A T O   N O N   U F F I C I A L E',500,235);
  x.fillStyle='#fb923c';x.font='900 54px sans-serif';x.fillText('CERTIFICATO DI SCUDO',500,300);
  x.fillStyle='#fff';x.font='20px sans-serif';x.fillText('conferito a',500,345);x.font='bold 46px sans-serif';x.fillText(n,500,405);
  x.font='20px sans-serif';x.fillStyle='#cbd5ff';x.fillText('per aver superato il quiz “'+t.quiz.t+'”',500,450);x.fillText('e per aver costruito il proprio scudo contro le minacce del web.',500,480);
  x.strokeStyle='#fb923c';x.lineWidth=2;x.beginPath();x.roundRect(370,515,260,60,30);x.stroke();x.fillStyle='#fb923c';x.font='bold 26px sans-serif';x.fillText(pc+'/100 SUPERATO',500,555);
  if(li.naturalWidth)x.drawImage(li,70,570,86,62);
  x.textAlign='right';x.fillStyle='#9aa4cc';x.font='20px sans-serif';x.fillText(new Date().toLocaleDateString('it-IT',{day:'numeric',month:'long',year:'numeric'}),930,610);x.fillStyle='#fb923c';x.fillText('Shieldo',930,640)};
 draw();$('#nm').oninput=draw;
 $('#dl').onclick=()=>{const a=document.createElement('a');a.download='certificato-shieldo.png';a.href=cv.toDataURL('image/png');a.click()};
 const showUp=d=>{$('#upv').innerHTML=(d.startsWith('data:application/pdf')?`<embed src="${d}" type="application/pdf" style="width:100%;height:520px;border-radius:12px;margin-top:10px">`:`<img src="${d}" style="max-width:100%;border-radius:12px;margin-top:10px">`)+'<br><button class="btn g" id="ud">Rimuovi</button>';$('#ud').onclick=()=>{SV('up_'+t.id,'');$('#upv').innerHTML='';$('#up').value=''}};
 const old=LS('up_'+t.id,'');if(old)showUp(old);
 $('#up').onchange=e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=()=>{showUp(r.result);SV('up_'+t.id,r.result)};r.readAsDataURL(f)}}

/* ===== EMERGENZA ===== */
function sos(){
 const N=[['🚑','Ambulanza','118','Emergenze mediche'],['🚓','Polizia di Stato','113','Reati e pericoli'],['🛡️','Carabinieri','112','Pronto intervento'],['🚒','Vigili del fuoco','115','Incendi e soccorso'],[IC('sospill'),'Numero unico emergenze','112','Valido in tutta Europa'],[IC('telefono'),'Telefono Azzurro','19696','Aiuto per ragazzi (gratuito)']];
 app.innerHTML=`<h1 class="hi">${IC('sos')}<span>CHIAMATA DI EMERGENZA</span></h1><p class="sub">Tocca il pulsante per chiamare con un click dal telefono.</p>${SC('Chiama solo in caso di vera emergenza. Mantieni la calma e, se puoi, chiedi aiuto a un adulto.')}<div class="grid">${N.map(n=>`<div class="card sosc"><div class="ico">${n[0]}</div><h3>${n[1]}</h3><p>${n[3]}</p><a class="btn sos" href="tel:${n[2]}">📞 CHIAMA ${n[2]}</a></div>`).join('')}</div><div class="card" style="margin-top:20px"><span class="tag">Cosa dire</span><ul class="tips"><li><i class="ck">1</i>Dì chi sei e che cosa è successo.</li><li><i class="ck">2</i>Dì dove ti trovi (indirizzo o punto di riferimento).</li><li><i class="ck">3</i>Non riattaccare finché l’operatore non te lo dice.</li></ul><small style="color:var(--mu)">Su computer il pulsante funziona solo se hai un’app di chiamata collegata. I numeri sono quelli italiani.</small></div>`}

/* ===== CHIEDI A SHIELDO (chatbot) ===== */
const nz=t=>t.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9:\/\.\-\s]/g,' ').replace(/\s+/g,' ').trim();
const hit=(t,k)=>k.length<=3?(' '+t+' ').includes(' '+k+' '):(' '+t+' ').includes(' '+k);
const L=(...a)=>'<ul>'+a.map(x=>`<li>${x}</li>`).join('')+'</ul>';
const KB=[
{id:'ciao',k:['ciao','salve','hey','ehi','buongiorno','buonasera','hello','yo'],a:'Ciao! Sono <b>Shieldo</b> 🛡️, il tuo scudo digitale. Chiedimi di virus, password, truffe, profili falsi, IA, cyberbullismo… oppure incolla un link sospetto e lo controllo!'},
{id:'chi',k:['chi sei','come ti chiami','cosa sai fare','cosa puoi fare','puoi aiutarmi','come mi puoi aiutare','sei un robot','sei umano','sei una persona','chi ti ha creato','chi ti ha fatto'],a:'Sono <b>Shieldo</b>, un assistente automatico (non una persona) creato da SIAM AHMED per aiutare i ragazzi a stare al sicuro online. So spiegare virus, password, truffe, profili falsi, IA e privacy, controllo i link sospetti e posso farti dei mini-quiz. Per cose gravi, parla sempre con un adulto di fiducia.'},
{id:'grazie',k:['grazie','thanks','gentile','bravo','perfetto','ottimo'],a:'Di niente! 😊 Ricorda: nel dubbio, fermati e chiedi a un adulto. Vuoi un’altra domanda o un mini-quiz?'},
{id:'bye',k:['arrivederci','addio','a dopo','buonanotte','ci vediamo'],a:'A presto, cyber eroe! 🛡️ Resta sempre vigile online.'},
{id:'virus',k:['virus','malware','trojan','spyware','ransomware','infetto','infettato','hacker','hackerato'],a:'Un <b>virus</b> (o malware) è un programma cattivo che entra nel telefono o nel computer di nascosto: ruba dati, mostra pubblicità o blocca tutto. Arriva da app false, allegati e link strani.'+L('Scarica app solo dagli store ufficiali','Aggiorna sempre il dispositivo','Non aprire allegati di sconosciuti','Se fa cose strane, spegni e avvisa un adulto'),more:'Segnali di un virus: telefono lentissimo, batteria che si scarica subito, pubblicità che compaiono da sole, app che non hai installato tu.',go:['impara/virus','Guarda la lezione sui virus']},
{id:'phishing',k:['phishing','truffa','truffe','truffato','raggiro','esca','link sospetto','messaggio sospetto','account bloccato','account sospeso','hai vinto','premio','regalo gratis'],a:'Il <b>phishing</b> è una truffa: un messaggio finto (mail, SMS, chat) ti spinge a cliccare e a dare password o dati. Segnali tipici:'+L('Urgenza (“ultime 2 ore!”)','Premi o cose gratis','Link strani o con errori','Richiesta di password o dati della carta'),more:'Cosa fare: non cliccare, non rispondere, apri tu l’app o il sito ufficiale e controlla lì. Se hai già cliccato, cambia password e dillo a un adulto.',go:['impara/truffe','Guarda la lezione sulle truffe']},
{id:'password',k:['password','parola d ordine','codice di accesso','credenziali','pin'],a:'Una <b>password forte</b>:'+L('è lunga (almeno 12 caratteri)','mischia maiuscole, minuscole, numeri e simboli','non contiene nome, data di nascita o “1234”','è diversa per ogni account'),more:'Trucco: usa una frase segreta, es. “MiPiaceIlGelatoAlLimone!7”. Non dirla a nessuno (nemmeno agli amici) e non scriverla in chat. Prova il gioco <a href="#giochi/pw">Password Master</a>!'},
{id:'2fa',k:['2fa','due passaggi','doppia verifica','autenticazione','verifica in due'],a:'La <b>verifica a due passaggi</b> aggiunge un secondo controllo (un codice sul telefono) oltre alla password. Anche se qualcuno scopre la password, non riesce ad entrare. Attivala sugli account importanti, con l’aiuto di un adulto.'},
{id:'profili',k:['profilo falso','profili falsi','account falso','finto','fingere','fake','si finge','catfish','falso amico','sconosciuto','sconosciuti'],a:'Online chiunque può <b>fingere di essere un altro</b>. Segnali di un profilo falso:'+L('account nuovo, poche foto, foto “perfette”','ti scrive subito e insiste per diventare amico','chiede foto, indirizzo, scuola o segreti','non vuole mai fare una videochiamata'),more:'Cosa fare: non rispondere, blocca, segnala e parlane con un adulto. Puoi cercare la sua foto con la ricerca per immagini.',go:['impara/profili','Guarda la lezione sui profili falsi']},
{id:'privacy',k:['privacy','dati personali','indirizzo','dove abito','numero di telefono','foto private','scuola','posizione','geolocalizzazione','condividere'],a:'Dati come <b>indirizzo, scuola, numero di telefono, password e foto private</b> non si danno a chi conosci solo online. Prima di postare una foto chiediti: “Va bene se la vede chiunque, per sempre?”. Controlla anche che non si veda dove abiti o dove sei in quel momento.'},
{id:'ia',k:['ia','intelligenza artificiale','deepfake','chatgpt','generato','creato con l ia','foto falsa','video falso','immagine falsa'],a:'L’<b>intelligenza artificiale</b> può creare foto, video e voci molto realistici (<b>deepfake</b>). Come difenderti:'+L('guarda mani, denti, testi e sfondi: spesso ci sono errori','cerca la notizia su fonti affidabili','diffida di video “troppo incredibili”','non modificare e non condividere foto di altri senza permesso'),more:'Prova l’<a href="#scanner">AI Scanner</a> di Shieldo: dà un’indicazione, ma nessuno strumento è sicuro al 100%.',go:['impara/ia','Guarda la lezione sull’IA']},
{id:'bullismo',k:['bullismo','cyberbullismo','bullo','bulli','mi prendono in giro','insulti','insultano','offendono','mi odiano','esclusa','escluso','minacciato','minacce','umiliato'],a:'Mi dispiace, non è colpa tua 💙 Nessuno ha il diritto di farti stare male. Cosa fare:'+L('<b>Non rispondere</b> e non vendicarti','<b>Fai screenshot</b> come prova','<b>Blocca</b> e segnala la persona sull’app','<b>Parlane subito con un adulto</b> di fiducia (genitori, insegnante)'),more:'Se vuoi parlare con qualcuno: <b>Telefono Azzurro 19696</b> (gratuito, per ragazzi). In pericolo immediato: <b>112</b>. <a href="#sos">Vai alla sezione Emergenza</a>.'},
{id:'ricatto',k:['ricatto','ricattato','ricattano','foto nude','nudo','nudi','minaccia di pubblicare','pubblicare le mie foto','sextortion','mi chiede soldi'],a:'⚠️ <b>Fermati un attimo: non è colpa tua e si può risolvere.</b>'+L('<b>Non pagare</b> e non mandare altre foto o video','Non cancellare le chat: fai screenshot','Blocca la persona','<b>Dillo subito a un adulto</b> di fiducia e rivolgetevi alla Polizia Postale (commissariatodips.it) o al <b>112</b>')+'Telefono Azzurro: <b>19696</b>. <a href="#sos">Numeri di emergenza</a>',urgent:1},
{id:'wifi',k:['wifi','wi-fi','rete pubblica','wifi pubblico','hotspot'],a:'Il <b>Wi-Fi pubblico</b> (bar, stazioni, centri commerciali) può essere spiato. Evita di inserire password o dati personali, non fare acquisti e, se puoi, usa i dati del telefono per le cose importanti.'},
{id:'giochi',k:['robux','vbucks','v-bucks','fortnite','roblox','minecraft','gratis nel gioco','skin gratis','hack','cheat','generatore','acquisti','gioco online','videogioco','videogiochi'],a:'Attenzione ai siti che promettono <b>Robux, V-Bucks o skin gratis</b>, “hack” o generatori: sono quasi sempre truffe per rubare l’account. Compra solo dallo store ufficiale e non dare mai la password del gioco, nemmeno a un “amico” conosciuto in chat.'},
{id:'social',k:['social','instagram','tiktok','whatsapp','snapchat','youtube','facebook','telegram','discord','follower','profilo privato','eta minima','età minima'],a:'Sui social: tieni il profilo <b>privato</b>, accetta solo persone che conosci davvero, non pubblicare dove sei in tempo reale e usa un nickname invece del nome vero. Molte app hanno un’età minima (spesso 13 anni): se non hai l’età, chiedi ai tuoi genitori.'},
{id:'agg',k:['aggiornamento','aggiornamenti','aggiornare','antivirus','sicuro il telefono','proteggere il telefono','proteggere il computer'],a:'Per proteggere i tuoi dispositivi: <b>aggiorna</b> sistema e app, installa solo da store ufficiali, usa un blocco schermo con PIN e, sul computer, un antivirus affidabile. Gli aggiornamenti chiudono le “porte” che i virus usano.'},
{id:'shieldo',k:['quiz','certificato','scanner','forum','giochi','classifica','come funziona','come si usa','a cosa serve','cos e shieldo','shieldo'],a:'Su <b>Shieldo</b> puoi:'+L('<a href="#impara">Impara</a>: video e consigli','<a href="#quiz">Quiz</a>: con almeno 70/100 ottieni il certificato','<a href="#giochi">Giochi</a>: sali nella TOP 10','<a href="#forum">Forum</a>: fai domande e aiuta gli altri','<a href="#scanner">AI Scanner</a>: controlla immagini e link','<a href="#sos">Emergenza</a>: numeri da chiamare con un tocco')},
{id:'emergenza',k:['emergenza','pericolo','chiamare','polizia','ambulanza','carabinieri','vigili del fuoco','numero emergenza','soccorso','112','118','113','115'],a:'🚨 In una <b>vera emergenza</b> chiama: <b>112</b> (numero unico), <b>118</b> ambulanza, <b>113</b> Polizia, <b>115</b> Vigili del fuoco. Telefono Azzurro (per ragazzi): <b>19696</b>. Nella sezione <a href="#sos">Emergenza</a> puoi chiamare con un tocco.',urgent:1},
{id:'battuta',k:['barzelletta','battuta','fammi ridere','scherzo','divertente'],a:()=>['Perché il computer è andato dal dottore? Aveva un virus! 🦠😄','Qual è la password preferita dei fantasmi? “Booooo123”… ma non usatela! 👻','Perché il telefono ha freddo? Ha lasciato le finestre (Windows) aperte! 🪟'][Math.random()*3|0]},
{id:'aiuto',k:['aiuto','aiutami','help','sos'],a:'Sono qui con te 🛡️ Raccontami cosa è successo o scegli un argomento. Se sei in <b>pericolo</b> o ti senti male, chiama il <b>112</b> o parla subito con un adulto: <a href="#sos">Emergenza</a>.',chips:['Mi prendono in giro','Qualcuno mi ha truffato','Uno sconosciuto mi scrive']},
{id:'tempo',k:['che ore sono','che giorno','meteo','tempo fa','calcio','partita','compiti','matematica','ricetta'],a:'Su questo non sono bravo 😅: io mi occupo di <b>sicurezza online</b>. Chiedimi di virus, password, truffe, profili falsi o IA!'}];
const DANGER=['suicid','uccidermi','togliermi la vita','farmi del male','voglio morire','non voglio vivere','autolesion','ammazzarmi'];
const CH={q:null,last:null};
const SUG=['Cos’è il phishing?','Come creo una password sicura?','Come riconosco un profilo falso?','Mettimi alla prova','Controlla un link'];
const URLRE=/(https?:\/\/\S+|www\.\S+|\b[\w-]+\.(?:com|it|net|org|xyz|top|click|app|io|ru|tk|ml|gq|cf|ga|icu|buzz)\b\S*)/i;
function nextQ(){const t=TOPICS[Math.random()*TOPICS.length|0],q=t.quiz.qs[Math.random()*t.quiz.qs.length|0];CH.q={q:q[0],o:q[1],c:q[2],t:t.id};return{h:'📝 <b>Domanda:</b> '+esc(q[0]),chips:q[1]}}
function answer(raw){
 const t=nz(raw);
 if(DANGER.some(d=>t.includes(d)))return{h:'Mi dispiace tanto che tu stia male 💙 <b>Non sei solo</b> e meriti aiuto. Parla <b>subito</b> con un adulto di cui ti fidi (genitore, parente, insegnante). Puoi chiamare il <b>Telefono Azzurro 19696</b> (gratuito) oppure il <b>112</b> se sei in pericolo. <a href="#sos">Apri la sezione Emergenza</a>.'};
 if(CH.q){const q=CH.q,i=q.o.findIndex(x=>nz(x)===t||(t.length>8&&nz(x).includes(t)));
  if(/^(basta|stop|esci|no)$/.test(t)){CH.q=null;return{h:'Ok, quiz finito! Bravo per l’impegno 🛡️',chips:SUG}}
  if(i>=0){CH.q=null;const ok=i===q.c;return{h:(ok?'✅ <b>Esatto!</b>':'❌ <b>Non proprio.</b> La risposta giusta è: <b>'+esc(q.o[q.c])+'</b>.')+' Vuoi un’altra domanda?',chips:['Altra domanda','Basta così']}}}
 if(/(altra domanda|ancora una|un altra|mettimi alla prova|quiz|interrogami|fammi una domanda|test)/.test(t)&&!/certificato/.test(t)){CH.last='quiz';return nextQ()}
 if(/basta cosi/.test(t))return{h:'Ok! Torna quando vuoi, cyber eroe 🛡️',chips:SUG};
 const m=raw.match(URLRE);
 if(m){const r=analyzeLink(m[0]);if(r)return{h:`<b>${r.v}</b>${L(...r.w)}<b>Cosa fare:</b> ${r.adv}<br><small>Analisi indicativa: nel dubbio chiedi a un adulto. Puoi provare anche l’<a href="#scanner">AI Scanner</a>.</small>`}}
 if(/(controlla|verifica|analizza).*(link|sito|url)|(link|sito).*(controlla|verifica|sicuro)/.test(t))return{h:'Certo! Incolla qui il link e lo controllo 🔎'};
 if(/^(dimmi di piu|continua|ancora|spiegami meglio|e poi|perche|come mai|esempio|approfondisci|altro)$/.test(t)||(t.split(' ').length<=3&&/(piu|ancora|perche|meglio)/.test(t))){const k=KB.find(x=>x.id===CH.last);if(k&&k.more)return{h:k.more,go:k.go};return{h:'Chiedimi pure un argomento preciso: virus, password, truffe, profili falsi, IA o privacy 🙂',chips:SUG}}
 let best=null,sc=0;KB.forEach(k=>{let x=0;k.k.forEach(w=>{if(hit(t,nz(w))){const z=nz(w);x+=z.split(' ').length*2+(z.length>5?1:0)}});if(k.id==='ciao'&&t.split(' ').length>3)x=0;if(x>sc){sc=x;best=k}});
 if(best){CH.last=best.id;return{h:typeof best.a==='function'?best.a():best.a,go:best.go,chips:best.more?['Dimmi di più']:null}}
 return{h:['Non ho capito bene 🤔 Prova a chiedermelo con altre parole, oppure scegli un argomento.','Hmm, su questo non so rispondere. Posso aiutarti con sicurezza online: scegli un argomento!'][Math.random()*2|0],chips:SUG}}
function chat(){
 const H=LS('chat',[]),first=!H.length;
 app.innerHTML=`<div class="chatw"><div class="chath"><div class="botav">${BOT}</div><div><h1 class="ct">CHIEDI A SHIELDO</h1><small><i class="dot"></i> Online · il tuo assistente per la sicurezza online</small></div><button class="chip" id="cc">🗑 Nuova chat</button></div><div id="cm" class="cm" aria-live="polite"></div><div id="cs" class="chips"></div><div class="cin"><input id="ci" placeholder="Scrivi una domanda a Shieldo…" maxlength="300" autocomplete="off"><button class="btn" id="cb">Invia ➤</button></div><small class="disc">Sono un assistente automatico: per cose serie parla sempre con un adulto di fiducia.</small></div>`;
 const cm=$('#cm'),cs=$('#cs');
 const add=(r,h,sv=true)=>{const d=document.createElement('div');d.className='msg '+r;d.innerHTML=(r==='b'?`<div class="botav">${BOT}</div>`:'')+`<div class="bub">${h}</div>`;cm.appendChild(d);cm.scrollTop=cm.scrollHeight;if(sv){H.push({r,h});SV('chat',H.slice(-40))}};
 const chips=l=>{cs.innerHTML='';(l||[]).forEach(c=>{const b=document.createElement('button');b.className='chip';b.textContent=c;b.onclick=()=>send(c);cs.appendChild(b)})};
 let busy=false;
 const send=txt=>{txt=(txt??$('#ci').value).trim();if(!txt||busy)return;$('#ci').value='';chips();add('u',esc(txt));busy=true;
  const ty=document.createElement('div');ty.className='msg b';ty.innerHTML=`<div class="botav">${BOT}</div><div class="bub typing"><span></span><span></span><span></span></div>`;cm.appendChild(ty);cm.scrollTop=cm.scrollHeight;
  let r;try{r=answer(txt)}catch{r={h:'Ops, qualcosa non ha funzionato. Riprova! 🙈',chips:SUG}}
  setTimeout(()=>{ty.remove();add('b',r.h+(r.go?`<br><a class="btn" style="margin-top:8px" href="#${r.go[0]}">▶ ${r.go[1]}</a>`:''));chips(r.chips);busy=false;$('#ci').focus()},450+Math.min(r.h.length,300)*3)};
 H.forEach(m=>add(m.r,m.h,false));
 if(first){add('b','Ciao! Sono <b>Shieldo</b> 🛡️. Chiedimi quello che vuoi sulla sicurezza online, oppure incolla un link sospetto e lo controllo.');}
 chips(SUG);
 $('#cb').onclick=()=>send();$('#ci').onkeydown=e=>{if(e.key==='Enter')send()};
 $('#cc').onclick=()=>{SV('chat',[]);CH.q=null;CH.last=null;chat()}}

/* ===== FORUM (condiviso online se config.js ha l'URL del database) ===== */
async function forum(){
 let f='Tutti',posts=[],err=false,open=false;
 const fmt=d=>new Date(d).toLocaleDateString('it-IT',{day:'numeric',month:'long',year:'numeric'});
 const merge=o=>[...Object.values(o).filter(p=>p&&p.t),...SEED.map(x=>({...x,r:[...x.r,...arr((o[x.id]||{}).r)]}))].map(p=>({...p,r:arr(p.r).sort((a,b)=>a.d-b.d)})).sort((a,b)=>b.d-a.d).slice(0,60);
 const load=async()=>{try{posts=merge((await dget('forum'))||{});err=false}catch{posts=merge({});err=true}};
 const rid=()=>Date.now().toString(36)+Math.random().toString(36).slice(2,6);
 const cool=()=>Date.now()-LS('lastpost',0)<15000;
 const nick=async()=>{let n=LS('nick','');if(!n||!okNick(n)){const v=prompt('Scrivi il tuo nickname (2-14 caratteri, non il nome vero!)');if(v===null||!(await saveNick(v)))return null;n=LS('nick','')}return n};
 const draw=()=>{app.innerHTML=`<div style="display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap;align-items:flex-start"><h1>FORUM</h1><div><button class="btn g" id="rf">↻ Aggiorna</button><button class="btn" id="nw">＋ NUOVA DOMANDA</button></div></div><p class="sub">Fai una domanda, racconta un dubbio o aiuta un altro ragazzo: insieme si impara meglio.</p>${SC('In questo forum nessuno è solo: chiedi aiuto senza vergogna e rispondi con gentilezza. Non scrivere mai nome vero, indirizzo, telefono o link.')}<div id="frm" class="card ${open?'':'hide'}"><input id="ft" maxlength="90" placeholder="Titolo della domanda"><textarea id="fb" rows="3" maxlength="400" placeholder="Racconta..."></textarea><select id="fc">${CATS.map(c=>`<option>${c}</option>`).join('')}</select><button class="btn" id="fs">PUBBLICA</button></div><div class="tabs">${['Tutti',...CATS].map(c=>`<button class="chip ${c===f?'on':''}" data-c="${c}">${c.toUpperCase()}</button>`).join('')}</div>${err?'<div class="card"><p>⚠️ Non riesco a caricare il forum. Controlla la connessione e premi “Aggiorna”.</p></div>':''}${posts.filter(p=>f==='Tutti'||p.cat===f).map(p=>`<div class="card" style="margin-bottom:14px"><span class="tag">${esc(p.cat)}</span> <small style="color:var(--mu)">${fmt(p.d)}</small>${p.ex?' <small style="color:var(--mu)">· esempio</small>':''}<h3>${esc(p.t)}</h3><p style="color:var(--tx)">${esc(p.b)}</p><small style="color:var(--mu)">di <b>${esc(p.a)}</b> · ${p.r.length} risposte</small>${p.r.map(r=>`<div class="rep"><b>${esc(r.a)}</b>: ${esc(r.b)}</div>`).join('')}<form data-id="${esc(p.id)}" style="display:flex;gap:8px;margin-top:8px"><input placeholder="Rispondi con gentilezza..." maxlength="250"><button class="btn" style="margin:0">Invia</button></form></div>`).join('')||(err?'':'<p class="sub">Nessuna domanda qui: scrivi la prima! 🙂</p>')}`;
  $('#nw').onclick=()=>{open=!open;$('#frm').classList.toggle('hide',!open)};
  $('#rf').onclick=async()=>{$('#rf').textContent='…';await load();draw()};
  app.querySelectorAll('.chip').forEach(b=>b.onclick=()=>{f=b.dataset.c;draw()});
  $('#fs').onclick=async()=>{const t=$('#ft').value.trim(),b=$('#fb').value.trim();if(!t||!b)return alert('Scrivi titolo e testo.');if(unsafe(t)||unsafe(b))return alert('Non scrivere parolacce, link, email o numeri di telefono.');if(cool())return alert('Aspetta qualche secondo prima di scrivere di nuovo.');
   const a=await nick();if(!a)return;const id=rid();$('#fs').disabled=true;
   try{await dput('forum/'+id,{id,cat:$('#fc').value,t,b,a,d:Date.now()});SV('lastpost',Date.now());open=false;await load();draw()}catch{alert('Non sono riuscito a pubblicare. Riprova.');$('#fs').disabled=false}};
  app.querySelectorAll('form[data-id]').forEach(fm=>fm.onsubmit=async e=>{e.preventDefault();const b=fm.querySelector('input').value.trim();if(!b)return;if(unsafe(b))return alert('Non scrivere parolacce, link, email o numeri di telefono.');if(cool())return alert('Aspetta qualche secondo prima di scrivere di nuovo.');
   const a=await nick();if(!a)return;try{await dput(`forum/${fm.dataset.id}/r/${rid()}`,{a,b,d:Date.now()});SV('lastpost',Date.now());await load();draw()}catch{alert('Non sono riuscito a inviare. Riprova.')}})};
 app.innerHTML='<h1>FORUM</h1><p class="sub">⏳ Carico le domande…</p>';await load();if(location.hash.slice(1)==='forum')draw()}

/* ===== GIOCHI + CLASSIFICHE TOP 10 (salvate nel browser) ===== */
const GAMES=[['mem','🧩','MEMORY DELLA SICUREZZA','Trova le coppie di simboli e scopri il significato di ogni icona della sicurezza.'],['esc','🔐','ESCAPE ROOM DELLE TRUFFE','Quattro stanze, quattro trappole online: scegli bene e scappa fuori.'],['run','🏃','SCUDO RUNNER','Corri con la mascotte e schiva truffe, virus e link pericolosi.'],['vf','⚡','VERO O FALSO LAMPO','60 secondi: vero o falso? Più ne indovini, più punti fai.'],['pw','🔑','PASSWORD MASTER','Costruisci la password più forte rispettando tutte le regole.']];
const medals=['🥇','🥈','🥉'];
async function lbGet(g){const o=(await dget('lb/'+g))||{};return Object.values(o).filter(e=>e&&typeof e.p==='number').sort((a,b)=>b.p-a.p||a.t-b.t).slice(0,10)}
async function lbPut(g,n,p){const k=`lb/${g}/${nkey(n)}`;let c=null;try{c=await dget(k)}catch{}if(!c||p>c.p)await dput(k,{n,p,t:Date.now()})}
async function renderLb(g,me){const h=$('#lb');if(!h)return null;h.innerHTML='<div class="card"><p>⏳ Carico la classifica…</p></div>';let l;
 try{l=await lbGet(g)}catch{if($('#lb'))$('#lb').innerHTML='<div class="card"><p>⚠️ Classifica non raggiungibile. Controlla la connessione e riprova.</p></div>';return null}
 if(!$('#lb'))return l;const pod=l.slice(0,3);
 $('#lb').innerHTML=`<div class="card"><span class="tag">🏆 Classifica TOP 10</span>${l.length?`<div class="podium">${[1,0,2].filter(i=>pod[i]).map(i=>`<div class="p${i+1}">${i==0?'<span class="crown">👑</span>':''}<b>${medals[i]}</b>${esc(pod[i].n)}<span>${pod[i].p}</span></div>`).join('')}</div><ol class="lb">${l.map((e,i)=>`<li class="r${i+1} ${me&&e.n===me?'me':''}"><em>${i<3?medals[i]:i+1}</em><b>${esc(e.n)}</b><span>${e.p}</span></li>`).join('')}</ol>`:'<p>Nessun record: sii il primo! 👑</p>'}<small style="color:var(--mu)">Il record resta finché qualcuno non lo supera.</small></div>`;return l}
function confetti(n=80){const c=['#facc15','#fb923c','#2dd4bf','#f43f7a','#a855f7','#38bdf8'];for(let i=0;i<n;i++){const d=document.createElement('i');d.className='cf';d.style.cssText=`left:${Math.random()*100}vw;background:${c[i%6]};animation-duration:${2+Math.random()*2.5}s;animation-delay:${Math.random()*.6}s;border-radius:${i%2?'50%':'2px'}`;document.body.appendChild(d);setTimeout(()=>d.remove(),5000)}}
function toast(t){const d=document.createElement('div');d.className='toast';d.textContent=t;document.body.appendChild(d);setTimeout(()=>d.remove(),3800)}
async function endGame(g,p){let n=LS('nick','');while(!n){const v=prompt('Scrivi il tuo nickname (2-14 caratteri, non il nome vero!)');if(v===null)break;if(await saveNick(v))n=LS('nick','')}
 if(!n||p<=0){renderLb(g);return}
 try{await lbPut(g,n,p)}catch{toast('⚠️ Punteggio non salvato online')}
 const l=await renderLb(g,n);if(!l)return;
 if(l[0]&&l[0].n===n&&l[0].p===p){confetti(140);toast('👑 NUOVO RECORD, '+n+'!')}else if(l.slice(0,3).some(e=>e.n===n&&e.p===p)){confetti(40);toast('🏅 Sei nella TOP 3!')}}
function giochi(g){
 if(!g){app.innerHTML=`<h1>GIOCHI</h1><p class="sub">Allenati divertendoti: ogni gioco ti insegna a riconoscere un pericolo del web.</p>${SC('Scegli il tuo gioco preferito! Io tifo per te: qui si impara giocando.')}<div class="card" style="margin-bottom:18px"><b>👤 Il tuo nickname</b> <small style="color:var(--mu)">(usalo per le classifiche, non il nome vero)</small><div style="display:flex;gap:8px"><input id="nk" maxlength="14" placeholder="Nickname" value="${esc(LS('nick',''))}"><button class="btn" id="nb">SALVA</button></div></div><div class="grid">${GAMES.map(x=>`<div class="card gc"><div style="display:flex;justify-content:space-between"><span class="ico">${x[1]}</span><span class="tag">🏆 <span id="rc_${x[0]}">…</span></span></div><h3>${x[2]}</h3><p>${x[3]}</p><a class="btn" style="width:100%;text-align:center" href="#giochi/${x[0]}">${IC('giochi')} GIOCA →</a></div>`).join('')}</div>`;
  GAMES.forEach(async x=>{let t='nessun record';try{const l=await lbGet(x[0]);if(l[0])t=l[0].p+' · '+l[0].n}catch{t='—'}const e=$('#rc_'+x[0]);if(e)e.textContent=t});
  $('#nb').onclick=async()=>{if(await saveNick($('#nk').value))$('#nb').textContent='SALVATO ✓'};return}
 const G=GAMES.find(x=>x[0]===g)||GAMES[0];
 app.innerHTML=`<a href="#giochi" class="back">← Tutti i giochi</a><h1>${G[2]}</h1><p class="sub">${G[3]} Giochi come: <b>${esc(LS('nick','(chiederò il nickname a fine partita)'))}</b></p><div class="two"><div id="gm"></div><div id="lb"></div></div>`;
 const gm=$('#gm');renderLb(g,LS('nick',''));
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
 if(g==='run'){gm.innerHTML=`<p class="sub">Punti: <b id="pt">0</b> — frecce, A/D, pulsanti o tocca il lato sinistro/destro.</p><canvas id="c" width="420" height="600" style="width:100%;max-width:420px;background:#000;touch-action:none;display:block"></canvas><div style="display:flex;gap:10px;max-width:420px;margin-top:10px"><button class="btn g" id="bl" style="flex:1">◀ Sinistra</button><button class="btn g" id="br" style="flex:1">Destra ▶</button></div><button class="btn" id="rs">RICOMINCIA</button>`;
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
 const draw=()=>{app.innerHTML=`<h1>AI SCANNER</h1><p class="sub">Carica un'immagine o incolla il link di un sito, un video o un profilo: Shieldo analizza il contenuto e ti dice se è creato con l'intelligenza artificiale o se nasconde una truffa.</p>${SC('Mostrami quello che ti sembra strano: immagini, video o link. Ti dirò cosa ho notato e come difenderti.')}<div class="two"><div><div class="tabs"><button class="btn ${tab=='img'?'':'g'}" data-t="img">📷 IMMAGINE</button><button class="btn ${tab=='lnk'?'':'g'}" data-t="lnk">🔗 LINK O VIDEO</button></div><div class="card">${tab=='img'?`<input type="file" id="fi" accept="image/*"><img id="pv" class="hide" style="max-width:100%;border-radius:12px;margin-top:10px"><p style="font-size:13px">Il file resta sul tuo dispositivo e viene usato solo per l'analisi.</p>`:`<input id="li" placeholder="https://..." inputmode="url">`}<button class="btn" id="an" style="width:100%">ANALIZZA</button></div><div id="out"></div></div><div><span class="tag">Ultimi controlli</span><div class="hist" style="margin-top:10px">${H.map(h=>`<div class="card"><span class="tag" style="color:${h.c}">${h.v}</span><div style="word-break:break-all;color:var(--mu);font-size:14px">${esc(h.n)}</div></div>`).join('')||'<p class="sub">Ancora nulla.</p>'}</div></div></div>`;
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
 const scanLink=()=>{const raw=$('#li').value.trim();if(!raw){alert('Incolla un link.');return}const r=analyzeLink(raw);if(!r)alert('Link non valido.');return r};
 draw()}

function analyzeLink(raw){
  let u;try{u=new URL(/^https?:/i.test(raw)?raw:'https://'+raw)}catch{return null}
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
  return{s:ai?Math.max(s,60):s,v,w,n:raw,adv:'Non inserire password o dati. Apri il sito scrivendo tu l’indirizzo ufficiale e, se sei già entrato, cambia password e avvisa un adulto.'}}

route();
