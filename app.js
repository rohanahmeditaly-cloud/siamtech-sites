// ===== DATI E CONFIGURAZIONE =====
// ===== DATI E CONFIGURAZIONE (CON ICONE PROFESSIONALI SVG) =====
const navItems = [
  { 
    id: 'home', 
    icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>', 
    text: 'HOME' 
  },
  { 
    id: 'learn', 
    icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>', 
    text: 'IMPARA' 
  },
  { 
    id: 'quiz', 
    icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect><path d="m9 14 2 2 4-4"></path></svg>', 
    text: 'QUIZ' 
  },
  { 
    id: 'games', 
    icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="6" y1="12" x2="10" y2="12"></line><line x1="8" y1="10" x2="8" y2="14"></line><line x1="15" y1="13" x2="15.01" y2="13"></line><line x1="18" y1="11" x2="18.01" y2="11"></line><rect x="2" y="6" width="20" height="12" rx="2"></rect></svg>', 
    text: 'GIOCHI' 
  },
  { 
    id: 'forum', 
    icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>', 
    text: 'FORUM' 
  },
  { 
    id: 'podcast', 
    icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>', 
    text: 'PODCAST' 
  },
  { 
    id: 'scanner', 
    icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path></svg>', 
    text: 'AI SCANNER' 
  }
];

const topics = [
  {
    id: 'malware',
    icon: '🦠',
    tag: 'SICUREZZA DISPOSITIVI',
    title: 'Virus & Malware',
    desc: 'Scopri come riconoscere file infetti, app trappola e come proteggere telefono e PC.',
    tips: [
      'Scarica app solo dagli store ufficiali (Google Play, App Store).',
      'Non aprire allegati .exe, .zip o .apk inviati da sconosciuti.',
      'Tieni sempre aggiornati sistema operativo e browser.'
    ]
  },
  {
    id: 'fake',
    icon: '🎭',
    tag: 'IDENTITÀ DIGITALE',
    title: 'Profili Falsi & Catfish',
    desc: 'Impara a smascherare account finti sui social e a difendere la tua privacy online.',
    tips: [
      'Controlla la data di creazione dell’account e l’interazione reale sotto i post.',
      'Fai una ricerca inversa delle immagini profilo per vedere se sono rubate.',
      'Non condividere mai foto private o posizione in tempo reale con sconosciuti.'
    ]
  },
  {
    id: 'phishing',
    icon: '🎣',
    tag: 'TRUFFE ONLINE',
    title: 'Truffe & Phishing',
    desc: 'Riconosci finti SMS della banca, pacchi in consegna inesistenti e link ruba-password.',
    tips: [
      'Controlla sempre l’indirizzo web (URL) prima di inserire password o dati.',
      'Diffida dai messaggi che mettono fretta ("Account bloccato entro 24 ore!").',
      'Attiva l’autenticazione a due fattori (2FA) su tutti i tuoi account.'
    ]
  },
  {
    id: 'ai',
    icon: '🤖',
    tag: 'NUOVE TECNOLOGIE',
    title: 'Contenuti IA & Deepfake',
    desc: 'Distingui video, voci e notizie generate dall’Intelligenza Artificiale dalla realtà.',
    tips: [
      'Osserva dettagli come mani, denti, riflessi negli occhi e movimenti labiali nei video.',
      'Verifica sempre le notizie clamorose su almeno due testate affidabili.',
      'Concorda una parola d’ordine in famiglia contro le truffe con clonazione vocale.'
    ]
  }
];

const quizQuestions = [
  {
    q: 'Ricevi un SMS: "Il tuo pacco è fermo in dogana, clicca su bit.ly/pacco-99 e paga 1,99€". Cosa fai?',
    opts: [
      'Clicco subito e inserisco la carta prepagata per non perdere il pacco',
      'Ignoro e cancello il messaggio: è un classico tentativo di smishing (phishing via SMS)',
      'Rispondo al numero chiedendo quale corriere è'
    ],
    ans: 1,
    exp: 'Esatto! I corrieri ufficiali non chiedono pagamenti tramite link abbreviati sospetti.'
  },
  {
    q: 'Qual è la password più sicura tra queste?',
    opts: [
      'Marco2010!',
      '123456789',
      'Tigre$Viola#84Luna!'
    ],
    ans: 2,
    exp: 'Perfetto! Una passphrase lunga con maiuscole, numeri e simboli è molto più difficile da violare.'
  },
  {
    q: 'Un tuo amico ti scrive su Instagram chiedendoti un codice arrivato sul tuo telefono via SMS. Cosa significa?',
    opts: [
      'Probabilmente gli hanno rubato l’account e stanno cercando di rubare anche il tuo',
      'Ha perso il telefono e gli serve il tuo codice per ritrovarlo',
      'È un nuovo gioco di Instagram'
    ],
    ans: 0,
    exp: 'Bravissimo! Quel codice serve a resettare la tua password: non inviarlo mai a nessuno.'
  },
  {
    q: 'Cos’è l’autenticazione a due fattori (2FA)?',
    opts: [
      'Avere due password uguali su due siti diversi',
      'Un secondo livello di sicurezza (es. codice temporaneo su app o SMS) oltre alla password',
      'Un antivirus gratuito'
    ],
    ans: 1,
    exp: 'Corretto! Anche se qualcuno scopre la tua password, senza il secondo codice non può entrare.'
  }
];

const episodes = [
  { id: 1, title: 'Ep. 1 - La trappola del Wi-Fi pubblico', dur: '04:15', desc: 'Cosa succede ai tuoi dati quando ti colleghi a una rete aperta al bar o in stazione.' },
  { id: 2, title: 'Ep. 2 - Deepfake e truffe vocali', dur: '05:40', desc: 'Come l’IA può imitare la voce di qualcuno e come smascherarla in 10 secondi.' },
  { id: 3, title: 'Ep. 3 - Password e Passkey spiegate facili', dur: '03:50', desc: 'Perché usare la stessa password ovunque è il regalo preferito dagli hacker.' }
];

// ===== STATO APPLICAZIONE =====
let currentPage = 'home';
let quizState = { idx: 0, score: 0, answered: false };
let forumPosts = JSON.parse(localStorage.getItem('shieldo_forum')) || [
  { user: 'Alex_09', tag: 'TRUFFE', text: 'Oggi mi è arrivato un finto messaggio della banca su WhatsApp, l’ho subito segnalato e bloccato!' },
  { user: 'SaraTech', tag: 'CONSIGLIO', text: 'Ho attivato la verifica in due passaggi su tutti i social, ci vogliono 2 minuti e stai tranquillo.' }
];
let memState = { cards: [], flipped: [], matched: 0, moves: 0, lock: false };
let playingEp = null;

// ===== INIZIALIZZAZIONE =====
const navEl = document.getElementById('nav');
const appEl = document.getElementById('app');
const sideEl = document.getElementById('side');
const burgerBtn = document.getElementById('burger');

burgerBtn.addEventListener('click', () => {
  sideEl.classList.toggle('open');
});

function renderNav() {
  navEl.innerHTML = navItems.map(item => `
    <a href="#${item.id}" class="${currentPage === item.id ? 'on' : ''}" data-page="${item.id}">
      <span>${item.icon}</span>
      ${item.text}
    </a>
  `).join('');

  navEl.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      navigate(link.dataset.page);
      sideEl.classList.remove('open');
    });
  });
}

function navigate(page, extra = null) {
  currentPage = page;
  renderNav();
  window.scrollTo({ top: 0, behavior: 'smooth' });

  if (page === 'home') renderHome();
  else if (page === 'learn') renderLearn(extra);
  else if (page === 'quiz') renderQuiz();
  else if (page === 'games') renderGames();
  else if (page === 'forum') renderForum();
  else if (page === 'podcast') renderPodcast();
  else if (page === 'scanner') renderScanner();
}

// ===== PAGINA 1: HOME =====
function renderHome() {
  appEl.innerHTML = `
    <section class="hero">
      <div>
        <span class="pill">TUO SCUDO DIGITALE</span>
        <h1>SCOPRI IL TUO <span class="hl">POTERE DIGITALE.</span></h1>
        <p class="sub">Impara, gioca e proteggiti online con guide pratiche, sfide interattive e uno scanner intelligente contro link e messaggi sospetti.</p>
        <div>
          <button class="btn" onclick="navigate('learn')">INIZIA A IMPARARE →</button>
          <button class="btn g" onclick="navigate('scanner')">✨ AI SCANNER</button>
        </div>
      </div>
      <div class="mascot">🛡️</div>
    </section>

    <div class="scudo">
      <div class="av">🤖</div>
      <div>
        <b>CONSIGLIO DI SHIELDO</b>
        <p style="margin:4px 0 0 0;">Prima di cliccare su un link ricevuto via messaggio, controlla sempre chi lo manda e usa il nostro <strong>AI Scanner</strong> per verificare se nasconde trappole.</p>
      </div>
    </div>

    <h2>Esplora le aree di difesa</h2>
    <div class="grid">
      ${topics.map(t => `
        <a href="#learn" class="card" style="text-decoration:none; color:inherit;" onclick="event.preventDefault(); navigate('learn', '${t.id}')">
          <div class="ico">${t.icon}</div>
          <span class="tag">${t.tag}</span>
          <h3>${t.title}</h3>
          <p style="color:var(--mu); font-size:14px;">${t.desc}</p>
          <span style="color:var(--te); font-weight:700; font-size:13px;">Approfondisci →</span>
        </a>
      `).join('')}
    </div>
  `;
}

// ===== PAGINA 2: IMPARA =====
function renderLearn(selectedId = null) {
  const activeId = selectedId || topics[0].id;
  const activeTopic = topics.find(t => t.id === activeId) || topics[0];

  appEl.innerHTML = `
    <span class="pill">ACCADEMIA DIGITALE</span>
    <h1>Impara a <span class="hl">difenderti online</span></h1>
    <p class="sub">Seleziona un argomento per scoprire come funzionano le minacce più comuni e le regole d’oro per evitarle.</p>

    <div class="tabs">
      ${topics.map(t => `
        <button class="chip ${t.id === activeTopic.id ? 'on' : ''}" onclick="renderLearn('${t.id}')">
          ${t.icon} ${t.title}
        </button>
      `).join('')}
    </div>

    <div class="two">
      <div class="card">
        <div class="ico">${activeTopic.icon}</div>
        <span class="tag">${activeTopic.tag}</span>
        <h2>${activeTopic.title}</h2>
        <p>${activeTopic.desc}</p>
        <h3 style="margin-top:20px; color:var(--te);">Regole pratiche di protezione:</h3>
        <ul class="tips">
          ${activeTopic.tips.map(tip => `<li>✅ ${tip}</li>`).join('')}
        </ul>
      </div>

      <div class="card">
        <h3>Metti alla prova ciò che hai imparato</h3>
        <p style="color:var(--mu); font-size:14px;">Completa il quiz rapido per verificare il tuo livello di difesa digitale.</p>
        <button class="btn" style="width:100%; margin-top:10px;" onclick="navigate('quiz')">VAI AL QUIZ 📋</button>
        <hr style="border:none; border-top:1px solid var(--line); margin:20px 0;">
        <h3>Hai ricevuto un messaggio strano?</h3>
        <p style="color:var(--mu); font-size:14px;">Incollalo nello scanner per analizzare parole chiave e link sospetti.</p>
        <button class="btn g" style="width:100%;" onclick="navigate('scanner')">APRI AI SCANNER ✨</button>
      </div>
    </div>
  `;
}

// ===== PAGINA 3: QUIZ =====
function renderQuiz() {
  if (quizState.idx >= quizQuestions.length) {
    const perc = Math.round((quizState.score / quizQuestions.length) * 100);
    appEl.innerHTML = `
      <div class="card" style="text-align:center; max-width:600px; margin:20px auto; padding:40px;">
        <div style="font-size:64px; margin-bottom:10px;">🏆</div>
        <span class="pill">RISULTATO FINALE</span>
        <h1>Hai totalizzato ${quizState.score} su ${quizQuestions.length} (${perc}%)</h1>
        <p class="sub" style="margin:15px auto 25px auto;">
          ${perc >= 75 ? 'Ottimo lavoro! Hai i riflessi pronti contro truffe e pericoli digitali.' : 'Buon inizio! Ripassa le guide nella sezione Impara per raggiungere il 100%.'}
        </p>
        <button class="btn" onclick="resetQuiz()">RIPROVA IL QUIZ 🔄</button>
        <button class="btn g" onclick="navigate('home')">TORNA ALLA HOME</button>
      </div>
    `;
    return;
  }

  const current = quizQuestions[quizState.idx];
  const progress = ((quizState.idx) / quizQuestions.length) * 100;

  appEl.innerHTML = `
    <span class="pill">SFIDA INTERATTIVA</span>
    <h1>Quiz <span class="hl">Cyber-Sicurezza</span></h1>
    <p class="sub">Domanda ${quizState.idx + 1} di ${quizQuestions.length} — Punteggio attuale: <strong>${quizState.score}</strong></p>

    <div class="bar"><i style="width:${progress}%"></i></div>

    <div class="card" style="max-width:760px;">
      <h3 style="font-size:20px; margin-bottom:20px;">${current.q}</h3>
      <div id="quiz-opts">
        ${current.opts.map((opt, i) => `
          <button class="opt" onclick="answerQuiz(${i})">${opt}</button>
        `).join('')}
      </div>
      <div id="quiz-feedback"></div>
    </div>
  `;
}

function answerQuiz(choice) {
  if (quizState.answered) return;
  quizState.answered = true;

  const current = quizQuestions[quizState.idx];
  const buttons = document.querySelectorAll('#quiz-opts .opt');

  buttons.forEach((btn, i) => {
    btn.disabled = true;
    if (i === current.ans) btn.classList.add('ok');
    else if (i === choice) btn.classList.add('no');
  });

  if (choice === current.ans) quizState.score++;

  document.getElementById('quiz-feedback').innerHTML = `
    <div class="res ${choice === current.ans ? 'good' : 'bad'}">
      <strong>${choice === current.ans ? '✅ Risposta corretta!' : '❌ Attenzione!'}</strong>
      <p style="margin:6px 0 12px 0;">${current.exp}</p>
      <button class="btn" onclick="nextQuiz()">PROSSIMA DOMANDA →</button>
    </div>
  `;
}

function nextQuiz() {
  quizState.idx++;
  quizState.answered = false;
  renderQuiz();
}

function resetQuiz() {
  quizState = { idx: 0, score: 0, answered: false };
  renderQuiz();
}

// ===== PAGINA 4: GIOCHI (MEMORY CYBER) =====
function initMemory() {
  const icons = ['🛡️', '🔐', '🔑', '🦠', '🎣', '🤖', '📡', '💎'];
  const deck = [...icons, ...icons].sort(() => Math.random() - 0.5);
  memState = { cards: deck, flipped: [], matched: 0, moves: 0, lock: false };
}

function renderGames() {
  if (memState.cards.length === 0) initMemory();

  appEl.innerHTML = `
    <span class="pill">ALLENA LA MENTE</span>
    <h1>Cyber <span class="hl">Memory</span></h1>
    <p class="sub">Abbina tutte le coppie di sicurezza digitale nel minor numero di mosse possibile.</p>

    <div class="two">
      <div class="card">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
          <span>Mosse: <strong id="mem-moves">${memState.moves}</strong></span>
          <button class="btn g" style="padding:8px 14px; font-size:12px;" onclick="initMemory(); renderGames();">NUOVA PARTITA 🔄</button>
        </div>
        <div class="memg" id="mem-grid">
          ${memState.cards.map((icon, idx) => `
            <button class="mc" data-idx="${idx}" onclick="flipCard(${idx})">❓</button>
          `).join('')}
        </div>
      </div>

      <div class="card">
        <h3>Come si gioca</h3>
        <p style="color:var(--mu); font-size:14px;">Clicca su due tessere per scoprire i simboli della sicurezza digitale. Quando trovi due icone identiche restano scoperte!</p>
        <div id="mem-win"></div>
      </div>
    </div>
  `;
}

function flipCard(idx) {
  if (memState.lock) return;
  const btns = document.querySelectorAll('.mc');
  const btn = btns[idx];
  if (btn.classList.contains('up') || btn.classList.contains('done')) return;

  btn.classList.add('up');
  btn.textContent = memState.cards[idx];
  memState.flipped.push(idx);

  if (memState.flipped.length === 2) {
    memState.moves++;
    document.getElementById('mem-moves').textContent = memState.moves;
    memState.lock = true;

    const [a, b] = memState.flipped;
    if (memState.cards[a] === memState.cards[b]) {
      btns[a].classList.add('done');
      btns[b].classList.add('done');
      memState.matched += 2;
      memState.flipped = [];
      memState.lock = false;

      if (memState.matched === memState.cards.length) {
        document.getElementById('mem-win').innerHTML = `
          <div class="res good">
            <strong>🎉 Vittoria!</strong>
            <p style="margin:6px 0 0 0;">Hai completato il Cyber Memory in <strong>${memState.moves} mosse</strong>!</p>
          </div>
        `;
      }
    } else {
      setTimeout(() => {
        btns[a].classList.remove('up');
        btns[b].classList.remove('up');
        btns[a].textContent = '❓';
        btns[b].textContent = '❓';
        memState.flipped = [];
        memState.lock = false;
      }, 750);
    }
  }
}

// ===== PAGINA 5: FORUM =====
function renderForum() {
  appEl.innerHTML = `
    <span class="pill">COMMUNITY SHIELDO</span>
    <h1>Il Nostro <span class="hl">Forum</span></h1>
    <p class="sub">Condividi esperienze, segnala nuove truffe che hai incontrato o lascia un consiglio utile per gli altri.</p>

    <div class="two">
      <div>
        ${forumPosts.map(p => `
          <div class="card" style="margin-bottom:14px;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
              <strong style="color:var(--te);">@${p.user}</strong>
              <span class="tag" style="margin:0;">${p.tag}</span>
            </div>
            <p style="margin:0;">${p.text}</p>
          </div>
        `).join('')}
      </div>

      <div class="card">
        <h3>Scrivi un messaggio</h3>
        <input type="text" id="f-user" placeholder="Il tuo nickname (es. CyberMarco)">
        <select id="f-tag">
          <option value="CONSIGLIO">💡 CONSIGLIO</option>
          <option value="SEGNALAZIONE">🚨 SEGNALAZIONE TRUFFA</option>
          <option value="DOMANDA">❓ DOMANDA</option>
        </select>
        <textarea id="f-text" rows="4" placeholder="Scrivi qui la tua esperienza o domanda..."></textarea>
        <button class="btn" style="width:100%;" onclick="addPost()">PUBBLICA NEL FORUM →</button>
      </div>
    </div>
  `;
}

function addPost() {
  const user = document.getElementById('f-user').value.trim() || 'UtenteShieldo';
  const tag = document.getElementById('f-tag').value;
  const text = document.getElementById('f-text').value.trim();
  if (!text) return;

  forumPosts.unshift({ user, tag, text });
  localStorage.setItem('shieldo_forum', JSON.stringify(forumPosts));
  renderForum();
}

// ===== PAGINA 6: PODCAST =====
function renderPodcast() {
  appEl.innerHTML = `
    <span class="pill">ASCOLTA E IMPARA</span>
    <h1>Shieldo <span class="hl">Podcast</span></h1>
    <p class="sub">Pillole audio brevi e chiare per capire la sicurezza informatica in pochi minuti.</p>

    <div style="max-width:780px;">
      ${episodes.map(ep => `
        <div class="card ep">
          <button class="play" onclick="togglePlay(${ep.id})">${playingEp === ep.id ? '⏸' : '▶'}</button>
          <div style="flex:1;">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <h3 style="margin:0;">${ep.title}</h3>
              <span class="tag" style="margin:0;">${ep.dur}</span>
            </div>
            <p style="color:var(--mu); font-size:14px; margin:6px 0 0 0;">${ep.desc}</p>
            ${playingEp === ep.id ? `<div style="color:var(--te); font-size:13px; font-weight:700; margin-top:8px;">🔊 Riproduzione simulata in corso...</div>` : ''}
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

function togglePlay(id) {
  playingEp = (playingEp === id) ? null : id;
  renderPodcast();
}

// ===== PAGINA 7: AI SCANNER =====
function renderScanner() {
  appEl.innerHTML = `
    <span class="pill">ANALISI INTELLIGENTE</span>
    <h1>Shieldo <span class="hl">AI Scanner</span></h1>
    <p class="sub">Incolla un link sospetto, un SMS o un’email ricevuta: l’algoritmo analizzerà i segnali di rischio.</p>

    <div class="two">
      <div class="card">
        <h3>Cosa vuoi analizzare?</h3>
        <textarea id="scan-input" rows="5" placeholder="Esempio: Il tuo pacco è in sospeso, clicca su http://bit.ly/verifica-subito e inserisci i tuoi dati..."></textarea>
        <button class="btn" style="width:100%;" onclick="runScan()">AVVIA SCANSIONE ✨</button>
        <div id="scan-output"></div>
      </div>

      <div class="card">
        <h3>Cosa controlla lo Scanner?</h3>
        <ul class="tips">
          <li>🔗 <strong>Link accorciati o non sicuri</strong> (HTTP senza lucchetto, domini strani).</li>
          <li>⚠️ <strong>Urgenza artificiale</strong> ("account sospeso", "ultimo avviso", "paga subito").</li>
          <li>💳 <strong>Richiesta dati sensibili</strong> (PIN, password, codici OTP o carta).</li>
        </ul>
      </div>
    </div>
  `;
}

function runScan() {
  const input = document.getElementById('scan-input').value.trim();
  const out = document.getElementById('scan-output');
  if (!input) {
    out.innerHTML = `<div class="res mid">Inserisci prima un testo o un indirizzo web da controllare.</div>`;
    return;
  }

  const lower = input.toLowerCase();
  let risk = 0;
  let reasons = [];

  if (lower.includes('http://')) { risk += 2; reasons.push('Collegamento non cifrato (HTTP invece di HTTPS)'); }
  if (lower.includes('bit.ly') || lower.includes('tinyurl') || lower.includes('t.co')) { risk += 2; reasons.push('Link abbreviato che nasconde la destinazione reale'); }
  if (/password|pin|carta|bancomat|otp|codice|credenziali/.test(lower)) { risk += 2; reasons.push('Richiesta diretta di dati personali o codici segreti'); }
  if (/urgente|bloccato|sospeso|24 ore|subito|pacco|vinto|premio|dogana/.test(lower)) { risk += 2; reasons.push('Linguaggio che crea urgenza o promette premi facili (tipico del phishing)'); }

  if (risk >= 3) {
    out.innerHTML = `
      <div class="res bad">
        <strong>🚨 RISCHIO ALTO RILEVATO</strong>
        <p style="margin:6px 0;">Questo contenuto presenta forti segnali di truffa o phishing:</p>
        <ul style="margin:0; padding-left:18px;">${reasons.map(r => `<li>${r}</li>`).join('')}</ul>
      </div>
    `;
  } else if (risk >= 1) {
    out.innerHTML = `
      <div class="res mid">
        <strong>⚠️ ATTENZIONE: CONTENUTO SOSPETTO</strong>
        <p style="margin:6px 0;">Sono presenti elementi da verificare con cautela:</p>
        <ul style="margin:0; padding-left:18px;">${reasons.map(r => `<li>${r}</li>`).join('')}</ul>
      </div>
    `;
  } else {
    out.innerHTML = `
      <div class="res good">
        <strong>✅ NESSUN SEGNALE EVIDENTE DI PHISHING</strong>
        <p style="margin:6px 0 0 0;">Il testo non contiene schemi tipici di truffa, ma verifica sempre il mittente prima di condividere dati.</p>
      </div>
    `;
  }
}

// Avvio iniziale dell'app
navigate('home');
