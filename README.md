# Shieldo – web app statica
Sito statico (HTML/CSS/JS, nessun server).
## Pubblicazione su GitHub Pages
1. Crea un repository e carica `index.html`, `style.css`, `app.js` (e la cartella `video/` se la usi) nella radice.
2. Settings → Pages → Deploy from branch → `main` / root.
3. Dominio personalizzato: Settings → Pages → Custom domain, poi crea un record CNAME (o A) presso il tuo provider DNS.
## Personalizzare
- Video: in `app.js`, array `TOPICS`, campo `yt` = ID YouTube (es. `dQw4w9WgXcQ`) oppure `video/virus.mp4`.
- Domande quiz, episodi podcast e forum iniziale: stesse sezioni DATI in `app.js`.
