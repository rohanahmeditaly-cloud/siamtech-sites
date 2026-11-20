'use strict';
const $=(s,r=document)=>r.querySelector(s), app=$('#app');
const LS=(k,d)=>{try{const v=JSON.parse(localStorage.getItem('sh_'+k));return v??d}catch{return d}};
const SV=(k,v)=>{try{localStorage.setItem('sh_'+k,JSON.stringify(v))}catch{}};
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const SC=(t)=>`<div class="scudo"><span class="av">🛡️</span><div><b>SCUDO</b>${t}</div></div>`;

/* ===== DATI: modifica qui contenuti, video (yt = ID YouTube oppure file "video/nome.mp4"), quiz ===== */
const PAGES=[['home','🏠','HOME'],['impara','📖','IMPARA'],['quiz','📝','QUIZ'],['giochi','🎮','GIOCHI'],['forum','👥','FORUM'],['podcast','🎙️','PODCAST'],['scanner','✨','AI SCANNER']];
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
$('#nav').innerHTML=PAGES.map(p=>`<a href="#${p[0]}" data-p="${p[0]}"><span>${p[1]}</span>${p[2]}</a>`).join('');
$('#burger').onclick=()=>$('#side').classList.toggle('open');
let stopFn=null;
function route(){
 if(stopFn){stopFn();stopFn=null} speechSynthesis.cancel();
 const [p,arg]=(location.hash.slice(1)||'home').split('/');
 $('#side').classList.remove('open');
 document.querySelectorAll('#nav a').forEach(a=>a.classList.toggle('on',a.dataset.p===p||(p==='certificato'&&a.dataset.p==='quiz')));
 const R={home,impara,quiz,giochi,forum,podcast,scanner,certificato};(R[p]||home)(arg);
 scrollTo(0,0);
}
addEventListener('hashchange',route);

/* ===== HOME ===== */
function home(){app.innerHTML=`<section class="hero"><div><span class="pill">👋 CIAO, FUTURO CYBEREROE!</span><h1>Costruisci il tuo <span class="hl">scudo</span> digitale</h1><p class="sub">Shieldo ti insegna a riconoscere virus, profili falsi, truffe e contenuti creati dall'intelligenza artificiale. Impara, gioca, fai il quiz e ricevi il tuo certificato.</p><a class="btn" href="#impara">INIZIA A IMPARARE →</a><a class="btn g" href="#scanner">✨ AI SCANNER</a><button class="btn" id="inst" style="display:none">⬇ SCARICA APP</button></div><div class="mascot">🛡️</div></section>
<h2>Cosa trovi</h2><div class="grid">${PAGES.slice(1).map(p=>`<a class="card" href="#${p[0]}" style="text-decoration:none;color:inherit"><div class="ico">${p[1]}</div><h3>${p[2]}</h3></a>`).join('')}</div>`;
 const b=$('#inst'); b.style.display='inline-block';
 b.onclick=async()=>{if(window._dp){_dp.prompt();_dp=null}else alert('Per installare l’app: dal menu del browser scegli “Aggiungi a schermata Home” / “Installa app”.')}}
addEventListener('beforeinstallprompt',e=>{e.preventDefault();window._dp=e});

/* ===== IMPARA ===== */
function impara(id){
 if(!id)return app.innerHTML=`<h1>IMPARA</h1><p class="sub">Scegli un argomento: video, consigli di Shieldo e quiz.</p>${SC('Ogni video ti dà un superpotere contro i pericoli del web.')}<div class="grid">${TOPICS.map(t=>`<a class="card" href="#impara/${t.id}" style="text-decoration:none;color:inherit"><span class="tag">${t.cat}</span><h3>${t.title}</h3><p>${t.desc}</p><span class="btn">GUARDA →</span></a>`).join('')}</div>`;
 const t=TOPICS.find(x=>x.id===id)||TOPICS[0], url=LS('vid_'+t.id,'')||t.yt;
 app.innerHTML=`<a href="#impara" style="color:var(--mu)">← Tutti i video</a><div class="two"><div><span class="tag">${t.cat}</span><h1>${t.title}</h1><p class="sub">${t.desc}</p>${player(url)}<div class="card" style="margin-top:14px"><b>🔗 Link video</b><p style="margin:4px 0">Incolla un link YouTube oppure un file .mp4 (es. da GitHub).</p><input id="vu" placeholder="https://..." value="${esc(LS('vid_'+t.id,''))}"><button class="btn" id="vs">COLLEGA VIDEO</button><button class="btn g" id="vr">Rimuovi</button><a class="btn g" target="_blank" rel="noopener" href="https://www.youtube.com/results?search_query=${encodeURIComponent(t.q)}">Cerca su YouTube</a></div></div><div><div class="card"><span class="tag">I consigli di Shieldo</span><ul class="tips">${t.tips.map(x=>`<li>🛡️ ${x}</li>`).join('')}</ul></div><div class="card" style="margin-top:16px"><span class="tag">Metti alla prova</span><p>Quiz disponibile: ${t.quiz.t}</p><a class="btn" href="#quiz/${t.id}">📝 FAI IL QUIZ</a></div></div></div>`;
 $('#vs').onclick=()=>{const v=$('#vu').value.trim();if(!v)return;SV('vid_'+t.id,v);impara(id)};
 $('#vr').onclick=()=>{SV('vid_'+t.id,'');impara(id)}}
function player(u){if(!u)return'<div class="card"><p>Nessun video collegato: incolla un link qui sotto.</p></div>';
 const m=u.match(/(?:youtu\.be\/|[?&]v=|embed\/|shorts\/)([\w-]{11})/)||(/^[\w-]{11}$/.test(u)?[0,u]:null);
 return m?`<iframe class="vid" src="https://www.youtube-nocookie.com/embed/${m[1]}" allow="encrypted-media;picture-in-picture;fullscreen" allowfullscreen></iframe>`:`<video class="vid" controls playsinline src="${esc(u)}"></video>`}

/* ===== QUIZ + CERTIFICATO (punteggio massimo 100) ===== */
const PASS=70;
function quiz(id){
 const res=LS('res',{});
 if(!id)return app.innerHTML=`<h1>QUIZ</h1><p class="sub">Rispondi alle domande: il punteggio massimo è 100. Con almeno ${PASS} ottieni il certificato.</p>${SC('Non aver paura di sbagliare: ogni errore è una lezione.')}<div class="grid">${TOPICS.map(t=>`<div class="card"><span class="tag">${t.cat}</span><h3>${t.quiz.t}</h3><p>${t.quiz.qs.length} domande${res[t.id]!=null?` · Miglior risultato: <b>${res[t.id]}/100</b>`:''}</p><a class="btn" href="#quiz/${t.id}">INIZIA</a>${res[t.id]>=PASS?`<a class="btn g" href="#certificato/${t.id}">🏅 Certificato</a>`:''}</div>`).join('')}</div>`;
 const t=TOPICS.find(x=>x.id===id)||TOPICS[0],qs=t.quiz.qs;let i=0,ok=0,bad=[];
 const step=()=>{
  if(i>=qs.length){const pc=Math.round(ok/qs.length*100);res[t.id]=Math.max(res[t.id]||0,pc);SV('res',res);
   return app.innerHTML=`<h1>${pc>=PASS?'🎉 Bravo!':'💪 Quasi!'}</h1><div class="card"><h2>${ok}/${qs.length} risposte giuste — punteggio ${pc}/100</h2><p>${pc>=PASS?'Hai superato il quiz: puoi ottenere il tuo certificato!':`Servono almeno ${PASS}/100 per il certificato. Rivedi il video e riprova.`}</p>${pc>=PASS?`<a class="btn" href="#certificato/${t.id}">🏅 OTTIENI CERTIFICATO</a>`:`<a class="btn g" href="#impara/${t.id}">▶ Rivedi il video</a>`}<button class="btn" id="rt">Riprova</button><a class="btn g" href="#video-q">Altri quiz</a></div>${bad.length?`<div class="card" style="margin-top:14px"><span class="tag">Da ripassare</span>${bad.map(b=>`<p style="margin:8px 0">• ${esc(b[0])}<br><b style="color:var(--te)">Risposta giusta: ${esc(b[1])}</b></p>`).join('')}</div>`:''}`,
   ($('#rt').onclick=()=>quiz(t.id),document.querySelector('a[href="#video-q"]').href='#quiz')}
  const [q,o,c]=qs[i];
  app.innerHTML=`<span class="tag">${t.quiz.t} · ${i+1}/${qs.length}</span><div class="bar"><i style="width:${i/qs.length*100}%"></i></div><h1 style="font-size:28px">${q}</h1>${o.map((x,k)=>`<button class="opt" data-k="${k}">${esc(x)}</button>`).join('')}<div id="fb"></div>`;
  app.querySelectorAll('.opt').forEach(b=>b.onclick=()=>{const k=+b.dataset.k;app.querySelectorAll('.opt').forEach((x,j)=>{x.disabled=true;if(j===c)x.classList.add('ok')});if(k===c)ok++;else{b.classList.add('no');bad.push([q,o[c]])}
   $('#fb').innerHTML=`<p>${k===c?'✅ Esatto!':'❌ Non proprio: la risposta giusta è evidenziata.'}</p><button class="btn" id="nx">${i+1<qs.length?'Avanti →':'Vedi risultato'}</button>`;$('#nx').onclick=()=>{i++;step()}})};
 step()}
function certificato(id){
 const t=TOPICS.find(x=>x.id===id)||TOPICS[0],pc=LS('res',{})[t.id];
 if(pc==null||pc<PASS){app.innerHTML=`<h1>Certificato</h1><div class="card"><p>Supera prima il quiz (almeno ${PASS}/100) per sbloccarlo.</p><a class="btn" href="#quiz/${t.id}">Fai il quiz</a></div>`;return}
 app.innerHTML=`<h1>Il tuo certificato</h1><p class="sub">Scrivi il tuo nome, poi scaricalo.</p><input id="nm" maxlength="30" placeholder="Scrivi il tuo nome" value="${esc(LS('name',''))}"><canvas id="cv" width="1000" height="700"></canvas><br><button class="btn" id="dl">⬇ SCARICA IL CERTIFICATO</button><a class="btn g" href="#quiz">Altri quiz</a>
 <div class="card" style="margin-top:20px"><span class="tag">Il tuo attestato</span><h3>Carica un PDF o un’immagine</h3><p>Carica il tuo attestato (PDF o immagine) per tenerlo qui e rivederlo quando vuoi.</p><input type="file" id="up" accept="image/*,application/pdf"><div id="upv"></div></div>`;
 const cv=$('#cv'),x=cv.getContext('2d');
 const draw=()=>{const n=$('#nm').value.trim()||'Giovane Difensore';SV('name',$('#nm').value.trim());
  x.fillStyle='#000';x.fillRect(0,0,1000,700);x.strokeStyle='#fb923c';x.lineWidth=10;x.strokeRect(20,20,960,660);x.lineWidth=2;x.strokeRect(45,45,910,610);
  x.textAlign='center';x.fillStyle='#fb923c';x.font='bold 60px sans-serif';x.fillText('🛡️',500,130);x.font='900 34px sans-serif';x.fillText('SHIELDO',500,175);
  x.fillStyle='#9aa4cc';x.font='16px sans-serif';x.fillText('A T T E S T A T O   N O N   U F F I C I A L E',500,215);
  x.fillStyle='#fb923c';x.font='900 54px sans-serif';x.fillText('CERTIFICATO DI SCUDO',500,285);
  x.fillStyle='#fff';x.font='20px sans-serif';x.fillText('conferito a',500,340);x.font='bold 46px sans-serif';x.fillText(n,500,400);
  x.font='20px sans-serif';x.fillStyle='#cbd5ff';x.fillText('per aver superato il quiz “'+t.quiz.t+'”',500,450);x.fillText('e per aver costruito il proprio scudo contro le minacce del web.',500,480);
  x.strokeStyle='#fb923c';x.lineWidth=2;x.beginPath();x.roundRect(370,515,260,60,30);x.stroke();x.fillStyle='#fb923c';x.font='bold 26px sans-serif';x.fillText(pc+'/100 SUPERATO',500,555);
  x.textAlign='right';x.fillStyle='#9aa4cc';x.font='20px sans-serif';x.fillText(new Date().toLocaleDateString('it-IT',{day:'numeric',month:'long',year:'numeric'}),930,630)};
 draw();$('#nm').oninput=draw;
 $('#dl').onclick=()=>{const a=document.createElement('a');a.download='certificato-shieldo.png';a.href=cv.toDataURL('image/png');a.click()};
 const showUp=(d)=>{$('#upv').innerHTML=d.startsWith('data:application/pdf')?`<embed src="${d}" type="application/pdf" style="width:100%;height:520px;border-radius:12px;margin-top:10px"><br><button class="btn g" id="ud">Rimuovi</button>`:`<img src="${d}" style="max-width:100%;border-radius:12px;margin-top:10px"><br><button class="btn g" id="ud">Rimuovi</button>`;$('#ud').onclick=()=>{SV('up_'+t.id,'');$('#upv').innerHTML='';$('#up').value=''}};
 const old=LS('up_'+t.id,'');if(old)showUp(old);
 $('#up').onchange=e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=()=>{showUp(r.result);SV('up_'+t.id,r.result)};r.readAsDataURL(f)}}

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

/* ===== GIOCHI ===== */
function giochi(g){
 const sc=LS('sc',{mem:0,esc:0,run:0});
 if(!g)return app.innerHTML=`<h1>GIOCHI</h1><p class="sub">Allenati divertendoti: ogni gioco ti insegna a riconoscere un pericolo del web.</p>${SC('Scegli il tuo gioco preferito! Io tifo per te: qui si impara giocando.')}<div class="grid"><div class="card"><div class="ico">🧩</div><h3>MEMORY DELLA SICUREZZA</h3><p>Trova le coppie di simboli e scopri il significato di ogni icona della sicurezza.</p><span class="tag">🏆 ${sc.mem} punti</span><br><br><a class="btn" href="#giochi/mem">GIOCA →</a></div><div class="card"><div class="ico">⚔️</div><h3>ESCAPE ROOM DELLE TRUFFE</h3><p>Quattro stanze, quattro trappole online: scegli bene e scappa fuori.</p><span class="tag">🏆 ${sc.esc} stanze superate</span><br><br><a class="btn" href="#giochi/esc">GIOCA →</a></div><div class="card"><div class="ico">🎮</div><h3>SCUDO RUNNER</h3><p>Corri con la mascotte e schiva truffe, virus e link pericolosi.</p><span class="tag">🏆 ${sc.run} punti</span><br><br><a class="btn" href="#giochi/run">GIOCA →</a></div></div>`;
 const back='<a href="#giochi" style="color:var(--mu)">← Tutti i giochi</a>';
 if(g==='mem'){const P=[['🔒','Lucchetto: i tuoi dati sono protetti'],['🔑','Password: tienila segreta'],['🛡️','Scudo: antivirus attivo'],['📶','Wi-Fi pubblico: attenzione ai dati'],['⚠️','Allarme: possibile truffa'],['🎣','Phishing: esca per rubare password'],['🦠','Virus: programma dannoso'],['🤖','IA: contenuto generato']];
  const d=[...P,...P].sort(()=>Math.random()-.5);let a=null,lock=false,m=0,fo=0;
  app.innerHTML=`${back}<h1>MEMORY DELLA SICUREZZA</h1><p id="inf" class="sub">Trova le coppie!</p><div class="memg">${d.map((c,i)=>`<button class="mc" data-i="${i}">❓</button>`).join('')}</div>`;
  const bs=app.querySelectorAll('.mc');
  bs.forEach(b=>b.onclick=()=>{if(lock||b.classList.contains('done')||b===a)return;const i=+b.dataset.i;b.textContent=d[i][0];b.classList.add('up');
   if(!a){a=b;return}m++;const j=+a.dataset.i;
   if(d[i][0]===d[j][0]){b.classList.add('done');a.classList.add('done');$('#inf').textContent='✅ '+d[i][1];a=null;if(++fo===8){const p=Math.max(100,1000-m*30);if(p>sc.mem){sc.mem=p;SV('sc',sc)}$('#inf').textContent=`🎉 Finito in ${m} mosse! Punti: ${p}`}}
   else{lock=true;const x=a;a=null;setTimeout(()=>{[b,x].forEach(e=>{e.textContent='❓';e.classList.remove('up')});lock=false},800)}})}
 if(g==='esc'){const R=[['📧 Stanza 1: arriva una mail “La tua banca ti chiede la password in 1 ora!”',['Clicco e accedo','Ignoro il link e contatto la banca con i canali ufficiali','Rispondo con la password'],1],['🎁 Stanza 2: un pop-up dice “Hai vinto un PlayStation, inserisci i dati della carta”',['Inserisco i dati','Chiudo la pagina: è una truffa','Condivido il link con gli amici'],1],['👤 Stanza 3: uno sconosciuto in chat vuole la tua foto e il tuo indirizzo',['Gli mando tutto','Blocco, segnalo e lo dico a un adulto','Gli do solo la via'],1],['🎮 Stanza 4: “Scarica questo hack gratis per il gioco!” (file .apk da un sito strano)',['Lo scarico','Non lo scarico: può contenere virus','Lo mando agli amici'],1]];
  let i=0,ok=0;const s=()=>{if(i>=R.length){if(ok>sc.esc){sc.esc=ok;SV('sc',sc)}return app.innerHTML=`${back}<h1>${ok===4?'🎉 Sei fuori!':'Fine'}</h1><p class="sub">Stanze superate: ${ok}/4</p><button class="btn" onclick="giochi('esc')">Riprova</button>`}
   app.innerHTML=`${back}<h1>ESCAPE ROOM</h1><div class="bar"><i style="width:${i*25}%"></i></div><h2>${R[i][0]}</h2>${R[i][1].map((o,k)=>`<button class="opt" data-k="${k}">${o}</button>`).join('')}<div id="fb"></div>`;
   app.querySelectorAll('.opt').forEach(b=>b.onclick=()=>{const g=+b.dataset.k===R[i][2];if(g)ok++;app.querySelectorAll('.opt').forEach(x=>x.disabled=true);b.classList.add(g?'ok':'no');$('#fb').innerHTML=`<p>${g?'🔓 Porta aperta!':'🚪 Trappola! La scelta giusta era un’altra.'}</p><button class="btn" id="nx">Avanti →</button>`;$('#nx').onclick=()=>{i++;s()}})};window.giochi=giochi;s()}
 if(g==='run'){app.innerHTML=`${back}<h1>SCUDO RUNNER</h1><p class="sub">Punti: <b id="pt">0</b> · 🏆 record <b>${sc.run}</b></p><div class="two"><div><canvas id="c" width="420" height="600" style="width:100%;max-width:420px;background:#000;touch-action:none;display:block"></canvas><div style="display:flex;gap:10px;max-width:420px;margin-top:10px"><button class="btn g" id="bl" style="flex:1">◀ Sinistra</button><button class="btn g" id="br" style="flex:1">Destra ▶</button></div></div><div>${SC('Schiva le truffe e resta in corsa: ogni punto è un pericolo riconosciuto in più. Usa le frecce, A/D, i pulsanti o tocca il lato sinistro/destro.')}<button class="btn" id="rs">RICOMINCIA</button></div></div>`;
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
   if(ob.some(o=>o.l===ln&&o.y+72>505&&o.y<578)){over=true;const s=Math.floor(fr/6);if(s>sc.run){sc.run=s;SV('sc',sc)}x.fillStyle='#000c';x.fillRect(0,230,420,130);x.fillStyle='#fff';x.font='bold 30px sans-serif';x.textAlign='center';x.fillText('Preso! Punti: '+s,210,285);x.font='16px sans-serif';x.fillText('Premi RICOMINCIA',210,320);return}
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
