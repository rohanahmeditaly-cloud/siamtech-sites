# Shieldo – web app statica

Sito statico (HTML/CSS/JS, nessun server). Funziona su GitHub Pages con dominio personalizzato.

## File da caricare su GitHub (tutti nella radice del repository)
`index.html`, `style.css`, `app.js`, `config.js`, `logo-data.js`, `videos.json`,
`logo-full.png`, `logo-emblem.png`, `favicon.png` (`firebase-rules.json` e `README.md` servono solo a te).

## Pubblicazione
1. Crea il repository e carica i file.
2. Settings → Pages → Deploy from branch → `main` / root.
3. Dominio: Settings → Pages → Custom domain, poi il record CNAME/A dal tuo provider DNS.

## Forum e classifiche condivisi tra tutti (Firebase gratuito, ~5 minuti)
Un sito statico non ha un database: per far vedere a tutti forum, nickname e TOP 10 si usa Firebase Realtime Database.
1. Vai su console.firebase.google.com → "Aggiungi progetto" (puoi disattivare Analytics).
2. Menu "Build" → "Realtime Database" → "Crea database" (scegli una regione europea) → avvia in modalità **bloccata**.
3. Scheda **Regole**: cancella tutto, incolla il contenuto di `firebase-rules.json` e premi **Pubblica**.
4. Copia l'URL del database (in alto nella scheda Dati, es. `https://xxxx-default-rtdb.europe-west1.firebasedatabase.app`).
5. Apri `config.js`, scrivi: `const SHIELDO_DB = 'IL_TUO_URL';` (senza `/` finale), salva e ricarica su GitHub.

Cosa succede: domande, risposte, nickname e punteggi restano salvati sempre e li vedono tutti, da telefono e PC.
Le regole impediscono di modificare o cancellare dal sito: un record viene sostituito solo da un punteggio più alto.
Per moderare (cancellare un messaggio o un nickname) usa la scheda Dati della console Firebase.
Senza URL in `config.js` il sito funziona lo stesso, ma salva solo sul dispositivo di ciascun utente.
Nota: non c'è login, quindi un utente può scegliere il nickname di un altro.

## Video delle lezioni (solo tu)
In `videos.json` metti il link per ogni argomento (gli utenti non possono cambiarlo):
`{"topic":"virus","url":"https://www.youtube.com/watch?v=XXXXXXXXXXX"}` (topic: virus, profili, truffe, ia).
Accetta link YouTube o file .mp4 nel repository (es. `video/virus.mp4`).
Video extra visibili a tutti: voci senza `topic`, es. `{"title":"Titolo","cat":"Extra","desc":"…","url":"…","tips":["Consiglio"]}`.
Gli utenti possono aggiungere solo i propri link (visibili solo a loro) e usare il pulsante di ricerca su YouTube.

## Chatbot "Chiedi a Shieldo"
È un assistente a regole che funziona offline: risponde su virus, password, truffe, profili falsi, IA, privacy, cyberbullismo, ricatti con foto, giochi online ed emergenze. Controlla link incollati, fa mini-quiz e, se rileva parole di pericolo, indirizza a un adulto, al 112 e al Telefono Azzurro 19696. Per aggiungere risposte modifica l'array `KB` in `app.js`.
