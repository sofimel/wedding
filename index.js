const WEDDING_TARGET = new Date('2026-11-14T15:00:00-03:00').getTime();
const COUNTDOWN_KEYS = ['days', 'hours', 'minutes', 'seconds'];

const SITE_STYLES = `
  :root {
    --cream: #f6f3e9;
    --olive: #48543a;
    --ink: #30382c;
    --terra: #a9664c;
    --line: #d6d8c9;
  }

  * {
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
    scroll-padding-top: 80px;
  }

  body {
    margin: 0;
    background: var(--cream);
    color: var(--ink);
    font-family: Arial, sans-serif;
    font-size: 15px;
    line-height: 1.7;
  }

  h1,
  h2,
  h3,
  .monogram {
    font-family: Georgia, serif;
    font-weight: 400;
  }

  a {
    color: inherit;
  }

  header {
    position: sticky;
    top: 0;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 18px 7%;
    border-bottom: 1px solid var(--line);
    background: var(--cream);
  }

  .monogram {
    font-size: 27px;
    text-decoration: none;
  }

  nav {
    display: flex;
    gap: 26px;
    font-size: 12px;
  }

  nav a {
    text-decoration: none;
  }

  .pill,
  .button {
    display: inline-block;
    padding: 11px 24px;
    border: 1px solid var(--olive);
    border-radius: 2px;
    background: var(--olive);
    color: var(--cream);
    cursor: pointer;
    font: inherit;
    text-decoration: none;
  }

  .pill {
    padding: 6px 17px;
    font-size: 12px;
  }

  main {
    overflow: hidden;
  }

  .hero {
    position: relative;
    min-height: 710px;
    padding: 85px 20px 55px;
    background: radial-gradient(ellipse at center, #fbf9f0 0%, #ebeede 100%);
    text-align: center;
  }

  .eyebrow {
    color: var(--olive);
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 3px;
    text-transform: uppercase;
  }

  h1 {
    margin: 22px 0;
    color: var(--olive);
    font-size: clamp(64px, 8vw, 112px);
    line-height: 1.03;
  }

  h1 em {
    color: var(--terra);
    font-size: 0.62em;
    font-weight: 400;
  }

  .hero .intro {
    max-width: 350px;
    margin: 25px auto;
    font-family: Georgia, serif;
    font-size: 19px;
    font-style: italic;
  }

  .date {
    margin: 28px 0;
    font-size: 13px;
    letter-spacing: 4px;
  }

  .leaf {
    position: absolute;
    bottom: -30px;
    width: 260px;
    height: 500px;
    opacity: 0.65;
    pointer-events: none;
  }

  .left {
    left: -45px;
    transform: rotate(17deg);
  }

  .right {
    right: -45px;
    transform: scaleX(-1) rotate(17deg);
  }

  .arch {
    position: absolute;
    inset: 35px max(18%, 20px) -1px;
    border: 1px solid #bcc3a9;
    border-radius: 48% 48% 0 0;
    pointer-events: none;
  }

  .hero > *:not(.arch):not(.leaf) {
    position: relative;
  }

  .countdown {
    display: flex;
    justify-content: center;
    gap: 38px;
    margin: 35px 0 0;
  }

  .countdown strong {
    display: block;
    font-family: Georgia, serif;
    font-size: 36px;
    font-weight: 400;
  }

  .countdown span {
    font-size: 11px;
    letter-spacing: 2px;
    text-transform: uppercase;
  }

  section {
    max-width: 960px;
    margin: 0 auto;
    padding: 70px 24px;
  }

  .location {
    display: grid;
    grid-template-columns: 1.1fr 1fr;
    gap: 48px;
    align-items: center;
  }

  .location h2,
  .dress h2,
  .rsvp h2,
  #presentes h2 {
    margin-top: 14px;
    margin-bottom: 20px;
    font-size: clamp(42px, 5vw, 58px);
    line-height: 1.1;
  }

  .muted,
  .provisional,
  .notice,
  .gift p,
  .detail,
  .rsvp p,
  .dress p,
  .location p {
    color: #5c6555;
  }

  .detail {
    margin-top: 18px;
    font-size: 15px;
    line-height: 1.9;
  }

  .detail small {
    display: block;
    margin-bottom: 4px;
    color: var(--olive);
    font-size: 10px;
    letter-spacing: 2px;
    text-transform: uppercase;
  }

  .location a {
    display: inline-block;
    margin-top: 20px;
    color: var(--olive);
    text-decoration: none;
  }

  iframe {
    display: block;
    width: 100%;
    min-height: 360px;
    border: 1px solid var(--line);
  }

  .dress,
  .rsvp,
  #presentes {
    text-align: center;
  }

  .swatches {
    display: flex;
    justify-content: center;
    gap: 14px;
    margin: 26px 0 14px;
  }

  .swatches i {
    display: block;
    width: 42px;
    height: 42px;
    border-radius: 50%;
    background: var(--s);
    border: 1px solid rgba(0, 0, 0, 0.08);
  }

  .gifts {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 22px;
    margin-top: 24px;
  }

  .gift {
    padding: 28px 20px;
    border: 1px solid var(--line);
    background: #fffdf9;
  }

  .gift svg {
    width: 58px;
    height: 58px;
    fill: none;
    stroke: var(--olive);
    stroke-width: 2.2;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .gift h3 {
    margin: 18px 0 10px;
    color: var(--olive);
    font-size: 28px;
  }

  .rsvp {
    display: grid;
    grid-template-columns: 0.8fr 1.2fr;
    gap: 36px;
    align-items: start;
  }

  form {
    display: grid;
    gap: 16px;
    text-align: left;
  }

  label {
    display: grid;
    gap: 8px;
    font-weight: 600;
  }

  input,
  select,
  textarea {
    width: 100%;
    padding: 12px 14px;
    border: 1px solid var(--line);
    border-radius: 8px;
    background: #fff;
    font: inherit;
  }

  textarea {
    resize: vertical;
    min-height: 120px;
  }

  button {
    border: none;
  }

  #status {
    min-height: 22px;
    color: var(--olive);
    font-weight: 600;
  }

  footer {
    padding: 30px 20px 50px;
    text-align: center;
  }

  footer h3 {
    margin-bottom: 8px;
    font-size: 32px;
    color: var(--olive);
  }

  @media (max-width: 700px) {
    .location,
    .rsvp,
    .gifts {
      grid-template-columns: 1fr;
    }

    header {
      flex-direction: column;
      align-items: flex-start;
      gap: 12px;
    }

    nav {
      flex-wrap: wrap;
      gap: 12px 18px;
    }

    .countdown {
      gap: 18px;
    }
  }
`;

const SITE_MARKUP = `
  <!doctype html>
  <html lang="pt-BR">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width,initial-scale=1">
      <title>Maressa & Matheus — 14.11.2026</title>
      <meta
        name="description"
        content="Celebre o casamento de Maressa e Matheus. Informações do dia, presentes e confirmação de presença."
      >
      <style>${SITE_STYLES}</style>
    </head>

    <body>
      <header>
        <a class="monogram" href="#inicio">M <span style="color: var(--terra)">&</span> M</a>
        <nav aria-label="Principal">
          <a href="#local">O grande dia</a>
          <a href="#dress">Dress code</a>
          <a href="#presentes">Presentes</a>
          <a class="pill" href="#presenca">Confirmar presença</a>
        </nav>
      </header>

      <main>
        <div class="hero" id="inicio">
          <div class="arch"></div>

          <svg class="leaf left" viewBox="0 0 200 420" aria-hidden="true">
            <g fill="none" stroke="#6f8056" stroke-width="1.4">
              <path d="M70 420Q140 240 100 20"/>
              <path d="M106 90Q40 55 30 10Q103 25 106 90ZM113 155Q170 110 170 65Q117 92 113 155ZM117 220Q45 170 25 120Q108 147 117 220ZM109 285Q180 240 191 183Q128 209 109 285ZM92 344Q20 300 7 247Q83 272 92 344" fill="#a0ae88"/>
            </g>
          </svg>

          <svg class="leaf right" viewBox="0 0 200 420" aria-hidden="true">
            <g fill="none" stroke="#6f8056" stroke-width="1.4">
              <path d="M70 420Q140 240 100 20"/>
              <path d="M106 90Q40 55 30 10Q103 25 106 90ZM113 155Q170 110 170 65Q117 92 113 155ZM117 220Q45 170 25 120Q108 147 117 220ZM109 285Q180 240 191 183Q128 209 109 285ZM92 344Q20 300 7 247Q83 272 92 344" fill="#a0ae88"/>
            </g>
          </svg>

          <div class="eyebrow">Vamos celebrar o amor</div>
          <h1>Maressa<br><em>&</em> Mateus</h1>
          <p class="intro">Um novo capítulo. Um dia especial.<br>E você fazendo parte dele.</p>
          <p class="date">14 · 11 · 2026 &nbsp; | &nbsp; 15H</p>
          <a class="button" href="#presenca">Eu vou celebrar com vocês ↗</a>

          <div class="countdown" aria-label="Contagem regressiva">
            <div><strong id="days">—</strong><span>Dias</span></div>
            <div><strong id="hours">—</strong><span>Horas</span></div>
            <div><strong id="minutes">—</strong><span>Minutos</span></div>
            <div><strong id="seconds">—</strong><span>Segundos</span></div>
          </div>
        </div>

        <section id="local" class="location">
          <div>
            <div class="eyebrow">O grande dia</div>
            <h2>Nos encontramos<br>para dizer sim.</h2>
            <p class="muted">Guarde esta data e venha compartilhar esse momento com a gente.</p>

            <div class="detail">
              <small>Quando</small>
              Sábado, 14 de novembro de 2026 · 15h
            </div>

            <div class="detail">
              <small>Onde</small>
              Rua Barba Alado, 555<br>Fortaleza — CE
            </div>

            <a target="_blank" rel="noopener" href="https://www.google.com/maps/search/?api=1&query=Rua%20Barba%20Alado%20555%20Fortaleza%20CE">
              Abrir endereço no Google Maps ↗
            </a>
          </div>

          <div>
            <iframe
              title="Busca do endereço no Google Maps"
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
              src="https://maps.google.com/maps?q=Rua%20Barba%20Alado%20555%20Fortaleza%20CE&output=embed"
            ></iframe>
            <p class="provisional">Mapa por busca de endereço. Confirme o ponto exato antes de sair.</p>
          </div>
        </section>

        <section class="dress" id="dress">
          <div class="eyebrow">Para entrar no clima</div>
          <h2>Leve, natural e especial.</h2>
          <h3>Esporte fino</h3>
          <p>Como sugestão, escolha tecidos leves e uma produção confortável. Tons terrosos, verdes e cores suaves combinam com a atmosfera da celebração.</p>

          <div class="swatches" aria-label="Inspiração de cores">
            <i style="--s: #7c8860"></i>
            <i style="--s: #bf886c"></i>
            <i style="--s: #d7c8a9"></i>
            <i style="--s: #888a71"></i>
            <i style="--s: #b99b7d"></i>
          </div>

          <p class="provisional">Sugestão provisória · o dress code será confirmado pelo casal.</p>
        </section>

        <section id="presentes">
          <div class="section-top">
            <div class="eyebrow">Com carinho</div>
            <h2>Presentes para uma nova história.</h2>
            <p>Sua presença é o que mais importa. Para quem quiser nos presentear, nossa lista estará disponível aqui em breve.</p>
          </div>

          <div class="gifts">
            <article class="gift">
              <svg viewBox="0 0 50 50" aria-hidden="true">
                <path d="M8 24L25 8l17 16M13 21v23h24V21M21 44V30h8v14"/>
              </svg>
              <h3>Nosso lar</h3>
              <p>Carinho em cada detalhe<br>do nosso novo capítulo.</p>
            </article>

            <article class="gift">
              <svg viewBox="0 0 50 50" aria-hidden="true">
                <path d="M12 16h26v28H12zM19 16V9h12v7M12 23h26M18 23v21M32 23v21"/>
              </svg>
              <h3>Novas aventuras</h3>
              <p>Memórias para construir<br>e lugares para descobrir.</p>
            </article>

            <article class="gift">
              <svg viewBox="0 0 50 50" aria-hidden="true">
                <path d="M25 43S4 29 6 17C8 5 20 6 25 15c5-9 17-10 19 2 2 12-19 26-19 26Z"/>
              </svg>
              <h3>Um gesto de amor</h3>
              <p>Um presente que faça parte<br>da nossa história.</p>
            </article>
          </div>

          <p class="notice">Lista em preparação · link definitivo a adicionar.</p>
        </section>

        <section class="rsvp" id="presenca">
          <div>
            <div class="eyebrow">Você faz parte desse dia</div>
            <h2>Vamos celebrar<br>juntos?</h2>
            <p class="muted">Confirme sua presença para nos ajudar a preparar cada detalhe.</p>
            <p>
              Maressa & Mateus<br>
              <span class="provisional">14 de novembro de 2026 · Fortaleza</span>
            </p>
          </div>

          <form id="rsvp">
            <label>
              Seu nome completo
              <input name="name" autocomplete="name" required maxlength="120" placeholder="Como podemos te chamar?">
            </label>

            <label>
              Você estará presente?
              <select name="attendance" required>
                <option value="">Selecione uma opção</option>
                <option value="yes">Sim, vou celebrar com vocês!</option>
                <option value="no">Infelizmente, não poderei ir</option>
              </select>
            </label>

            <label>
              Uma mensagem para o casal (opcional)
              <textarea name="message" maxlength="1000" rows="3" placeholder="Deixe seu carinho por aqui"></textarea>
            </label>

            <button class="button" type="submit">Enviar confirmação ↗</button>
            <div id="status" role="status" aria-live="polite"></div>
            <p class="provisional">Seu nome e sua resposta serão registrados para a organização do casamento.</p>
          </form>
        </section>
      </main>

      <footer>
        <h3>Maressa & Mateus</h3>
        <p>14.11.2026 · COM AMOR, EM FORTALEZA</p>
      </footer>

      <script>
        function handleRsvpSubmit(event) {
          event.preventDefault();

          const form = event.target;
          const button = form.querySelector('button');
          const status = document.getElementById('status');

          button.disabled = true;
          status.textContent = 'Enviando…';

          fetch('/api/rsvp', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(Object.fromEntries(new FormData(form))),
          })
            .then(async (response) => {
              if (!response.ok) {
                throw new Error('Resposta não registrada');
              }

              status.textContent = 'Resposta registrada. Obrigado pelo carinho!';
              form.reset();
            })
            .catch(() => {
              status.textContent = 'Não foi possível registrar sua resposta. Tente novamente em instantes.';
            })
            .finally(() => {
              button.disabled = false;
            });
        }

        function getCountdownValues() {
          const remainingSeconds = Math.max(0, Math.floor((WEDDING_TARGET - Date.now()) / 1000));

          return {
            days: Math.floor(remainingSeconds / 86400),
            hours: Math.floor((remainingSeconds % 86400) / 3600),
            minutes: Math.floor((remainingSeconds % 3600) / 60),
            seconds: remainingSeconds % 60,
          };
        }

        function updateCountdown() {
          const values = getCountdownValues();

          COUNTDOWN_KEYS.forEach((key, index) => {
            const element = document.getElementById(key);
            const value = Object.values(values)[index];

            if (element) {
              element.textContent = String(value).padStart(2, '0');
            }
          });
        }

        updateCountdown();
        setInterval(updateCountdown, 1000);

        const form = document.getElementById('rsvp');
        if (form) {
          form.addEventListener('submit', handleRsvpSubmit);
        }
      </script>
    </body>
  </html>
`;

function isValidRsvpPayload(data) {
  if (!data || typeof data !== 'object') {
    return false;
  }

  const name = typeof data.name === 'string' ? data.name.trim() : '';
  const attendance = data.attendance;
  const message = typeof data.message === 'string' ? data.message : '';

  return (
    name.length > 0 &&
    name.length <= 120 &&
    ['yes', 'no'].includes(attendance) &&
    message.length <= 1000
  );
}

async function handleRsvpApi(request, env) {
  if (request.method !== 'POST') {
    return new Response('Método não permitido', { status: 405 });
  }

  const url = new URL(request.url);

  if (request.headers.get('Origin') !== url.origin) {
    return new Response('Origem não permitida', { status: 403 });
  }

  try {
    if (Number(request.headers.get('content-length')) > 6000) {
      return new Response('Muito longo', { status: 413 });
    }

    const data = await request.json();

    if (!isValidRsvpPayload(data)) {
      return new Response('Dados inválidos', { status: 400 });
    }

    await env.BUCKET.put(
      `rsvp/${crypto.randomUUID()}.json`,
      JSON.stringify({
        name: data.name.trim(),
        attendance: data.attendance,
        message: data.message,
        createdAt: new Date().toISOString(),
      }),
      {
        httpMetadata: {
          contentType: 'application/json',
        },
      }
    );

    return Response.json({ ok: true });
  } catch {
    return Response.json({ ok: false }, { status: 503 });
  }
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === '/api/rsvp') {
      return handleRsvpApi(request, env);
    }

    if (url.pathname !== '/') {
      return new Response('Não encontrado', { status: 404 });
    }

    return new Response(SITE_MARKUP, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'X-Content-Type-Options': 'nosniff',
      },
    });
  },
};
